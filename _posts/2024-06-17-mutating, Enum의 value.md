---
layout: default
title: "mutating, Enum의 value"
tags: TIL
---

# 🤔 function와 method 차이

🎯  function은 재사용이 가능한 코드 블록을 의미하고, method는 클래스, 구조체, 열거형에 포함되는 function을 의미합니다.

# 🤔 mutating 키워드 의미

1. 스위프트에서 값 타입 프로퍼티들을 인스턴스 메서드에 의해 수정될 수 없습니다.
2. mutating 키워드를 메서드 앞에 붙이면, 값을 다루는  구조체나 열거형 인스턴스에서 프로퍼티를 수정할 수 있다.
3. mutating 키워드가 붙은 메서드의 실행 흐름은 스위프트는 새로운 구조체를 생성해 변경된 프로퍼티의 값을 할당하고 반환해서 현재 구조체를 대체합니다. 이러한 이유는 구조체의 불변성을 지키기 위해 이러한 방법을 사용됩니다.

인스턴스 메서드 : 클래스, 구조체, 열거형의 특정 인스턴스와 연결된 함수 ex)  `person.greet()`

구조체의 불변성 : 값 타입으로서 특성에 의해 발생하고, 값 타입의 인스턴스 생성된 후에 변경되지 않는 특성을 말합니다.

# 🤔 프로토콜과 클래스 차이

🎯클래스는 인스턴스 메서드의 실제 구현체를 가지고 있지만, 프로토콜은 청사진 처럼 메서드의 인터페이스만 가지고 있습니다. 

프로토콜이 구현체를 가지게 하려면 프로토콜의 Extension을 만들어 구현체를 작성할 수 있습니다.

# 🤔 Enum에서 raw Value와 associated value

🎯

1. raw value

 원시값으로, 열거형의 각 케이스에 기본적으로 할당되는 값입니다. 기본 타입, 커스텀 타입이 일 수 있고 모든 케이스는 같은 타입의 원시값을 가져야 합니다.

```swift
enum Weekday: Int {
    case sunday = 1
    case monday
    case tuesday
    case wednesday
    case thursday
    case friday
    case saturday
}

let day = Weekday.monday.rawValue
print(day) // 출력: 2
```

1. Associated Value

연관 값은 각 케이스에 추가적인 값을 연결할 수 있는 기능입니다. 각 케이스마다 연관값이 다를 수 있으며, 열거형의 인스턴스를 생성할 때마다 설정할 수 있습니다.

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

var productBarcode = Barcode.upc(8, 8, 8, 8)

switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check)")
case .qrCode(let code):
    print("QR Code: \(code)")
}
```
