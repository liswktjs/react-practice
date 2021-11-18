## React 스타일링하는 방법

1. css 파일을 만들어 import 하여 사용
2. Sass
3. Css Modules
4. styled components

#### Sass

- react에서 sass 사용하는 방법

설치 : yarn add node-sass@4.16.0

react의 경우 sass패키지 설치후 또다른 설정을 해주지 않아도 컴파일이 가능하다

### classNames

설치: yarn add classnames

문자열, 객체등을 하나의 classnames로 사용할 수 있다

false , null, 0, undefined의 경우 무시가된다

```
classNames('foo', { bar: true, duck: false}, 'baz' , '{quux :true}, 0, null, undefined)
// foo bar baz quuz 라는 클래스 이름이 생성된다
```

### 버튼에 ...rest props 전달하기

버튼을 클릭할 때에 발생하는 이벤트가 여러가지 일때 편하게 호출하는 방법

```
function Button ({color, size, ...rest}) {
    ....
}
<button className="button" {...rest}> </button>

```

...rest는 props에서 받아오는 다른 요소들을 모두 가리키게 된다

## CSS Module

css 이름이 중복되지 않도록 도와준다

파일명은 .module.css로 끝나야한다

사용시에는 import styles '../styles/Box.module.css'로 사용한다

```
import styles '../styles/Box.module.css';

function Box(){
    return <div className={styles.Box}>{styles.Box}</div>
}
```

레거시 프로젝트에 리액트를 도입시 기존의 css 이름과 중복되는 것을 막아준다

css 클래시 네이밍 규칙을 정하지 않아도 된다

## styled component

css in js 관련 라이브러리 / 자바스크립트 안에서 css를 작성하는 것

대체제들로는 emotion, styled-component, styled-jsx, jss등의 라이브러리가 있다

설치 : yarn add styled-components
