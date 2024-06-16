---
layout: default
title: "Upcasting와 Downcasting 차이"
tags: TIL
---

# Upcasting와 Downcasting 차이

# 1. 업캐스팅

🎯 서브클래스의 인스턴스를 슈퍼클래스 타입으로 변환하는 것입니다. 그래서 컴파일러가 항상 안전하게 보장합니다.

```swift
class Animal {
    func makeSound() {
        print("크르릉릉")
    }
}

class Dog: Animal {
    func bark() {
        print("멍멍")
    }
}

let dog: Dog = Dog()
let animal: Animal = dog

animal.makeSound() // "크르릉릉" 
```

위의 코드는 암시적 업캐스팅이 이루어진 상황이며, `as` 를 사용해서 업 캐스팅을 할 수 있습니다.

# 2. 다운캐스팅

🎯 슈퍼클래스 타입의 인스턴스를 서브클래스 타입으로 변환하는 것입니다. 그래서 항상 안전하지 않기 때문에, 명시적으로 이루어집니다. Swift에서는 실패할 수 있기 때문에 `as?` `as!` 연산자를 사용합니다.

```swift
let anotherDog = animal as! Dog
anotherDog.makeSound()
anotherDog.bark()
```

# 결론

업캐스팅은 자식클래스입장에서 부모클래스가 당연히 존재하기 때문에, 항상 안전하므로 암시적으로 이루어질 수 있습니다.

다운캐스팅은 부모클래스입장에서 자식클래스가 보장되어 있는 것이 아니기 때문에, 명시적으로 이루어집니다.
