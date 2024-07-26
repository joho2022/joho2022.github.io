---
layout: default
title: "Delegate, Completion Handler"
tags: TIL
---
notifyChange() : 라이브러리 변경사항이 있을 때 호출

# Delegate 패턴

```swift
protocol PhotoManagerDelegate: AnyObject {
    func photoLibraryDidChange()
}

class PhotoManager {
    weak var delegate: PhotoManagerDelegate?
    
    func notifyChange() {
        delegate?.photoLibraryDidChange()
    }
}
class CollectionViewController: UIViewController, PhotoManagerDelegate {
    var photoManager: PhotoManager?

    override func viewDidLoad() {
        super.viewDidLoad()
        photoManager = PhotoManager()
        photoManager?.delegate = self
        collectionView.dataSource = self
        collectionView.delegate = self
    }
    
    func photoLibraryDidChange() {
        DispatchQueue.main.async {
            self.collectionView.reloadData()
        }
    }
}
```

# Completion Handler 클로저
```swift
class PhotoManager {
    var onChange: (() -> Void)?

    func notifyChange() {
        onChange?()
    }
}
class CollectionViewController: UIViewController {
    var photoManager: PhotoManager?

    override func viewDidLoad() {
        super.viewDidLoad()
        photoManager = PhotoManager()
        photoManager?.onChange = { [weak self] in
            DispatchQueue.main.async {
                self?.collectionView.reloadData()
            }
        }
        collectionView.dataSource = self
        collectionView.delegate = self
    }
}

```
