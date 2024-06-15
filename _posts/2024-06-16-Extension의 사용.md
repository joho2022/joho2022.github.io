---
layout: default
title: "Extension은 어떻게 사용하나"
tags: TIL
---

# Extension은 어떻게 사용되나???


# 1. 새로운 메서드, 프로퍼티, 생성자 추가

🎯extension을 사용하게 되면 기존 타입에 새로운 메서드, 프로퍼티, 생성자를 추가할 수 있습니다.

```swift
extension String {
		func reversedString() -> String {
				return String(self.reversed())
		}
}

let original = "Hello"
let reversed = original.reversedString() 
print(reversed) // "olleH"
```

## 2. 저장 프로퍼티는 정의할 수 없다.

🎯 extension은 메모리 관리의 복잡성을 증가시키지 않기 위해서, 새로운 저장 프로퍼티를 저장할 수 없습니다.

```swift
extension Int {
    var isEven: Bool {
        return self % 2 == 0
    }
}

let number = 4
print(number.isEven) // true
```

## 3. 소멸자(deinitializer)는 추가할 수 없다.

🎯 deinitializer는 클래스 인스턴스가 메모리에서 해제될 때만 사용됩니다.

## 4.  구조체에서 직접 생성자를 구현하면 기본 생성자가 사라집니다.

클래스에 convenience init있는 것처럼, 구조체에서는 직접 생성자를 구현하면 memberwise initializer가 사라지게 되는데, extension을 사용하면 기본 생성자가 사라지지 않게 됩니다.

```swift
struct Person {
    var name: String
    var age: Int
}

extension Person {
    init(name: String) {
        self.name = name
        self.age = 28
    }
}

let person1 = Person(name: "철수", age: 30)
let person2 = Person(name: "민수")

print(person1) // Person(name: "철수", age: 30)
print(person2) // Person(name: "민수", age: 28)
```

# 5. where에 사용하여 특정한 조건을 가진 타입에 대해서 extension을 사용할 수 있게 합니다.

주로 제네릭 타입과 함께 사용하거나, 특정 프로토콜 준수 여부와 타입 제약 조건에 따라 확장을 적용시킵니다.
```swift
extension Array where Element: Equatable {
    func allEqual() -> Bool {
        guard let firstElement = self.first else { return true }
        return self.dropFirst().allSatisfy { $0 == firstElement }
    }
}

let array1 = [1, 1, 1, 1]
let array2 = [1, 2, 1, 1]

print(array1.allEqual()) // true
print(array2.allEqual()) // false
```
