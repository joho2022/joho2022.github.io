---
layout: default
title: "AVFoundation"
tags: TIL
---

# AVFoundation

애플의 미디어 프레임워크.

주요 기능으로는

- 미디어 캡쳐
- 미디어 재생
- 미디어 편집
- 미디어 파일 내용 분석

가장 자주 사용되는 기능은 미디어 재생이며, AVFoundation을 사용하면 효율적으로 재생을 로드하고 제어할 수 있다.

그러나, AVFoundation은 UIKit 아래에 있기 때문에 재생 제어를 위한 표준 UI를 제공하지 않는다. 이를 해결하기 위해 AVKit프레임워크에서 제공하는 기능에 의존하는 것

# AVKit

AVFoundation 위에 있는 보조 프레임워크.

이 프레임워크를 사용하면 플랫폼의 기본재생환경과 일치하는 앱용 플레이어 인터페이스를 쉽게 제공할 수 있다.
