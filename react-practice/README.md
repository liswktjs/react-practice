## react-practice 에서 배우는 react 개념 정리 


### JSX
: 자바스크립의 확장 문법 

- JSX 규칙들 

1.  tag는 닫혀 있어야 한다
2.  2개이상의 tag는 하나의 tag로 감싸줘야 한다 (```<div><div>``` 대신 ```<></>```로 감쌀수도 있다
)
3.  자바스크립트 변수를 사용할 때에는 {변수이름} 형식으로 입력한다 
4.  inline style등을 설정할 때에 객체로 만들어주어야 한다 
```
const style = {
    color: #111
};

<div style={style}>{name}</div>
```
5.  변수 이름들은 CamelCase 규칙을 따른다 

    (ex: background-color -> backgroundColor)


6.  class를 사용할 때에는 tag에 className="class이름" 으로 설정한다 

7.  주석을 쓸때에는 {/* */}로 감싸야 한다 (단, tag 안에 기록 할 때에는 {}로 감쌀 필요가 없다) 


### props
: 값을 전달해줄때 사용하는 것 

전달해주고자 하는 값을 tag로 선언시 같이 넣어준다 

사용법 예시 
> App.js
```
<Hello name="react" color="red"/>
``` 
> Hello.js
```
function Hello(props){
    return <div style={{color: props.color}}>Hello {props.name}</div>
}

// 비구조할당시 

function Hello({color, name}){
    return <div style={{color}}>
        Hello {name} </div>
}

//props값 기본값 설정시 

Hello.defaultProps = {
    name: 'undefined',
    color: 'black'
}
```

- props children
:tag와 tag사이에 들어가 있는 내용들 
> App.js
```
<Wrapper>
    <Hello name="react" color="red"/>
    <Hello />
</Wrapper>
``` 

>Wrapper.js
```
function Wrapper({children}){
    return <div>{children} </div>
}
```

### 조건부 렌더링 
```
<Hello name="react" isSpecial={true}>
```
처럼 true false인 경우를 나누어서 다르게 처리가 가능하다 -> 삼항 연사자 등으로 처리하기

### useState

사용방법 예제 
Counter.js
```
import React, {useState} from "react";

function Counter(){
    const [number, setNumber] = useState(0);

    const onPlus = () => {
        setNumber(number + 1);
        // or (함수형 업데이트가 가능하다)
        setNumber(pre => pre + 1);
    }
    const onMinus = () => {
        setNumber(number - 1);
        //or 
        setNumber(pre => pre - 1);
    }
    return(
        <div>
            <h1>{number}</h1>
            <button onClick={onPlus}>+1</button>
            <button onClick={onMinus}>-1</button>
        </div>
    )
}
```

number은 변수 이름 setNumber은 number을 관리하는 함수 useState(0)을 통해서 0으로 number을 초기화

### input 상태 관리하기 

- e.target : 이벤트가 발생한 dom에 대한 정보가 들어가 있음 
- e.target.value : dom에 입력된 value를 얻을 수 있음

- input의 value 값을 조정해주기 위해서는 value를 꼭 넣어야 한다 
예시 
```
const [text, setText] = useState('');
const onChange = (e) => {
    setText(e.target.value);
}
.
.
.
<input onChange={onChange} value={text}/>
```

### 여러개의 Input 관리하기 

- 객체 형태로 input을 관리하기 

```
const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
})
```

! 객체를  update할 때에는 기존의 객체를 복사하여 다시 업데이트 해야 한다 (불변성을 지켜야 하기 때문!)

```
const nextInputs = {
    ...inputs,
    [name] : value,
}
```

### useRef 

react에서는 특정 DOM을 선택할때에 document.querySelector() 등을 사용하지 않고 useRef를 사용한다
id를 활용하여 선택할 수도 있찌만 권장되지 않는다 
ref의 경우 컴포넌트 내부에서만 작동하기 떄문에 중복문제를 피할 수 있다 

ref는 reference의 줄임말로 DOM을 직접 건드려야 할 때에 주로 사용한다 

사용방법 

```
const nameInput = useRef(); // ref 객체 만들기 
<input ref={nameInput}/> // 참조하고자 하는 dom에 ref값으로 변수명 넣기 
nameInput.current.focus() // dom에 접근하여 원하는 작업 진행하기
```

### 배열 렌더링 하기 

- map을 사용하여서 구현하기
- 배열 랜더링 시 각 원소들 마다 key값을 부여해야 함 
```
users.map(user => (
    <Usesr user={user} key={user.id}>
))
```

### useRef로 컴포넌트 안의 변수 만들기 

컴포넌트가 rerendering 되어도 기억할 수 있는 변수 만들기 

변수에서도 ref를 달아서 컴포넌트 내부에있는 DOM을 컴포넌트 외부에서 사용할 때 쓰여진다 

- 주로 사용하는 곳 : setTimeout, setInterval 등의 id, 외부 라이브러리를 사용하여 생성된 인스턴스 ,scroll의 위치 등 

### 배열 다루기 

- 배열에 항목 추가하기 

1. 기존 항목을 복사한 후에 update를 진행하여야 한다 

예시 
```
// 새로운 user의 내용을 담은 객체를 만들기 
const user = {
      id: nextId.current,
      username,
      email,
}
// 복사한 기존의 users 배열에 user을 추가하기
setUsers([...users, user]);
```

2. concat 활용하기 
```
setUsers(users.concat(user));
```

- 배열에서 항목 제거하기 

삭제시 특정 id를 가지고 있는 항목만을 삭제해야 하기 떄문에 id 값을 같이 넘겨준다 파라미터 값을 넘겨주어야 할 때에는 새롭게 함수를 만들어서 넣어준다

onClick={onRemove(user.id)} (x)


<button onClick={() => onRemove(user.id)}>삭제</button> (o)


filter 함수 사용하기 
```
const onRemove = id => {
    setUsers(users.filter(user => user.id !== id))
}
```

- 배열에서 항목 수정하기 

map함수와 삼항연산자를 사용한다 이전 삭제하기와 마찬가지로 id 값을 활용해야 하므로 onClick에 {() => onToggle(user.id)} 로 표기해야한다!

```
const onToggle = id => {
    setUsers(users.map(
      user => user.id === id 
      ? {...user, active: !user.active}
      : user
    ))
  }
```