"우리는 우리가 보는 대로 된다"
========

![banner](https://i.imgur.com/f6FcrhT.png)

> *뉴스의 순환, 악순환, 무한 사이클에 관한 게임*

### [플레이 하러가기](https://game.hyeon.me/wbwwb)

<br>

---

### Made with open culture, for open culture!
이 게임은 Nicky Case가 만든 게임인 "We Become What We Behold"를 포크하여,
한국어로 번역한것입니다. 원본 소스코드는
[github.com/ncase/wbwwb](https://github.com/ncase/wbwwb)를 참고해주세요.

### Roadmap

- [x] 스트링 번역
- [x] 스프라이트 내의 영문들 번역
- [x] Noto Sans KR, KoPub Batang 폰트 적용
- [x] 한국어 웹폰트 로딩속도 최적화
    1.  폰트들 KS C 5601 서브셋으로 가공
	1.  [Prefetch Hack]으로 폰트들 로딩시점 조절
- [x] PIXI.js 업데이트, Deprecated된 API 호출 교체
- [x] WebGL이 지원되지 않는 브라우저에선 `<canvas>`로 fallback하도록 수정
- [ ] 전문가에게서 번역 검수받기
- [ ] Webpack 넣기
- [ ] 웹폰트 로딩이 `DOMContentLoaded` 이벤트를 지연시키는 문제 해결

[Prefetch Hack]: https://github.com/simnalamburt/wbwwb-kr/blob/master/index.html#L67-L69
