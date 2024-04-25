---
layout: default
title: "Dispatch Queue"
tags: TIL
---

## GCD(Grand Central Dispatch)

멀티코어 시스템에서 동시성 실행을 제공하는 기술 

이를 통해서 개발자는 스레드를 직접 관리하지 않고, 시스템이 최적의 방식으로 스레드를 관리해준다.

즉, 작업을 정의해서 Dispatch Queue에 넣어주면, 운영체제는 Dispatch Queue에 있는 작업들을 적절한 스레드에 할당한다. 그래서 개발자는 자신이 등록한 작업이 어떤 스레드에서 실행되는지 알 수 없다.

## GCD와 Dispatch Queue는 같으면서도 다르다.

위와같은 GCD의 개념으로 동시성 프로그래밍을 지원하는 Swift의 API가 Dispatch Queue인 것이다.

큐의 종류, qos 우선순위, (sync, async)를 설정해서 지정한 작업을 Dispatch Queue를 통해 스레드에 할당할 수 있다.

## Serial 과 Concurrent

Serial(직렬)은 큐에 등록된 작업을 한번에 하나씩 처리하는 것을 의미한다.

```swift
import Foundation

var numbers: [Int] = [0, 1, 2, 3, 4]
let dispatchQueue = DispatchQueue(label: "serial")
(0..<5).forEach( { index in
    dispatchQueue.async {
        print(numbers[index])
    }
})

dispatchMain()
```

결과가 항상 0, 1, 2, 3, 4 순서가 보장된다. 

Serial 큐로 만들어진 Dispatch Queue는 먼저 들어온 작업이 완료되어야 큐에 있는 다음 작업이 시작되기 때문이다.

즉, 한 작업이 끝날 때까지 큐에 있는 다른 작업은 건드리지 않기 때문에 실행 순서가 항상 같다.

반면에 concurrent(동시 발생의)는 동시에 여러 작업을 수행할 수 있다.

운영체제는 Dispatch Queue에서 현재 작업이 끝나지 않아도 다른 작업을 다른 스레드에 할당해서 동시에 여러 작업을 실행한다.

```swift
var numbers: [Int] = [0, 1, 2, 3, 4]
let dispatchQueue = DispatchQueue(label: "concurrent", attributes: .concurrent)

(0..<5).forEach( { index in
    dispatchQueue.async {
        print(numbers[index])
    }
})
```

위와 같은 코드에서는 실제로 사용했을 때 많은 스레드가 있기 때문에, 모든 작업을 한번에 처리하게 된다. 

개념적으로는 한 작업이 끝나지 않아도 동시에 여러 작업을 스레드에 할당하는 것

## 세 종류의 큐

Dispatch Queue를 사용할 때 세 종류의 큐를 선택하여 사용할 수 있다.

## Main Queue

- 메인 스레드에서 작업을 보관하고 수행하는 큐
- 단 하나만 존재할 수 있고, Serial 특성을 가지고 있다.
- 큐에 있는 작업을 순차적으로 실행한다.
- 메인 스레드는 UI 업데이트를 담당한다.
- 같은 순서의 출력을 보장한다.

## Global Queue

- 메인스레드가 아니라 다른 스레드에서 작업을 수행하는 큐
- concurrent 특성을 가지기 때문에, 여러 스레드를 분산하여 동시에 처리한다.
- 항상 같은 순서의 출력을 보장하지 않는다.

## Custom Queue

사용자가 어떤 특성의 큐로 Dispatch Queue를 생성할지 결정하는 것

기본값으로 Serial이고 attributes 인자를 통해 concurrent 변경 가능

## QOS (Quality of Service)

Custom Queue와 Global Queue에 적용할 수 있는 옵션이 바로 QOS 이다.

Main Queue는 이미 가장 높은 우선순위인 `User Interactive` QOS레벨로 운영된다.

우선 순위가 높은 큐는 더 많은 스레드가 할당되고, 상대적으로 우선순위가 낮은 큐는 적게 스레드가 할당된다.

QOS의 종류 우선순위 높은 순으로 5가지

- User Interactive : 사용자와 직접 상호작용을 하는 작업, UI 업데이트, 이벤트 처리 등 사용자 요청에 따라 즉각 응답해야 된다.
- User Initiated : 사용자가 요청했을 때 결과를 즉각 받거나 사용자가 앱을 사용하는 것을 순간적으로 막기 위한 경우
- Default : 기본 값
- Utility : 사용자와 상호작용을 하지 않으면서 오랜시간동안 작업을 진행해야하는 경우
- Background :  가장 낮은 우선순위, 말그대로 앱이 백그라운드에서 실행 중일 때 사용

## Sync 와 Async

Sync는 큐에 작업을 등록한 이후 완료될 때까지 기다리기

Async는 큐에 작업을 등록하면 작업을 기다리지 않고 계속 코드 실행하기

## 동기, 비동기는 Dispatch Queue에 작업을 등록하는 주체에 대한 설정

## serial, concurrent는 이미 큐에 들어온 작업을 어떻게 처리하냐에 대한 설정

그래서 위 내용을 조합할 수 있다

## Sync + Serial

큐에는 한 번에 하나의 작업만 들어가고, 작업은 항상 메인스레드에서 실행된다.

## [ 주의 ]DispatchQueue.main.sync는 데드락 상태에 빠져요

`데드락`: 2개 이상의 스레드가 서로 작업 완료를 무한히 기다리는 상태

1. Main Queue에서 sync를 호출하면 메인스레드는 등록한 작업이 끝날 때 까지 기다린다. 
2. 동시에 큐에 등록된 작업은 메인스레드에서 할당되는데,,
3. 이미 메인스레드는 아무것도 할 수 없는 상태이기 때문에 작업을 수행할 수 없다.
4. 데드락 상태 ~~

## [ 주의 ] 같은 큐에서 sync도 데드락상태에 빠져요

동일한 스레드에서 위와 같은 흐름으로 진행됨

## Async + Serial

작업의 등록은 계속 진행되고, 작업의 수행은 순차적으로 진행된다.

그래서 등록순서와 출력순서가 항상 일치함.

## Sync + Concurrent

작업의 등록이 작업이 끝날 때까지 기다리면서 진행되기 때문에, 큐는 concurrent특성이지만 등록 순서와 출력순서가 항상 일치함.

## Async + Concurrent

결국 이 조합만 등록순서와 출력순서가 항상 일치하지 않는다.
