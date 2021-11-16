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

: 상태 유지 값과 그 값을 갱신하는 함수를 반환한다

최초로 렌더링 하는 동안 반환된 state는 첫번째 전달인자로 초기화 되고 setState함수는 state 갱신시 사용한다 

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

useRef: .current 프로퍼티로 전달된 인자로 초기화된 변경 가능한 ref 객체로 해당 객체는 컴포넌트 전 생애 주기를 통해서 유지된다 

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

### useEffect Hook 

: 리액트 컴포넌트가 렌더링 될떄 마다 특정 작업을 수행하도록 설정할 수 있는 hook / useEffect에 전달되는 함수는 화면에 렌더링이 완료된 후에 수행된다 

역할: react에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야 하는지 말한다 react는 effect를 기억했다가 DOM 업데이트를 수행한 이후에 불러낸다 / 랜더링 할 때마다 실행된다

- mount : 컴포넌트가 나타나는 것을 의미 

- unmount : 컴포넌트가 삭제되는 것을 의미 

사용예시
```
useEffect(() => {
        console.log('컴포넌트가 화면에 나타남')
        // 실행가능한 목록 
        // props -> state 
        // REST API 
        // setInterval, setTimeout 등 
        return () => {
            console.log('컴포넌트가 사라짐')
            //clearInterval, clearTimeout
            // 라이브러리 인스턴스 제거 
        }
    }, [user]); // user값이 바뀔때마다 함수가 호출이 된다 user값은 최신의 상태인 user 값을 가리키게 된다  참조되는 값이 변경되는 경우 넣어줘야 한다  
```

### useMemo

성능을 최적화 해야하는 상황에서 사용한다 / 지정한 데이터값에 변동이 있을 때에만 함수를 실행한다 

예시 
```
const count = useMemo(() => countActiveUsers(users), [users]);
```

### useCallback 

useMemo와 비슷한 함수로 주로 렌더링 성능을 최적화 해야할때 사용된다 -> 만들었떤 함수를 재 사용할 수 있도록 해준다 

예시
```
//재사용하고자 하는 함수를 useCallback으로 감싸준다
 const onChange = useCallback (e => {
    const{name, value} = e.target
    setInputs({
      ...inputs,
      [name]:value
    })
  }, [inputs]); // 해당 파라미터에는 현재 함수로인해서 변하고 있는 객체를 넣어준다 해당 객체가 변할때에만 함수가 호출되어 사용되기 된다
```

### 컴포넌트 리렌더링 방지

- React.memo 
:컴포넌트의 리렌더링 성능을 올리는데 사용한다  컴포넌트가 변화할 떄에만 렌더링이 되게 된다

적용방법 

```
const User = React.memo(function User() {
    ...
})

export default React.memo(User)
```

### useReducer 

action을 기반으로 값들을 업데이트를 해준다 

상태 업데이트 로직을 컴포넌트 밖으로 분리가 가능하게 해준다 

reducer: 상태를 업데이트하는 함수 

예시 
```
function reducer(state,action){
    switch(action.type){
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' :
            return state - 1;
        default:
            return state;
    }
}
//사용시 reducer로 사용하고자 하는 함수, 초기화 값을 차례대로 넣는다
const [number,dispatch] = useReducer(reducer, 0);

// 적용할 때에 
const onMinus = () => {
        dispatch({
            type: 'DECREMENT'
        })
}
```

- useReducer vs useState

값이 하나이거나 단순한 문자열일 경우 useState가 편하다 

하지만 값이 배열이나 어떤 조건들을 거쳐야 하는 경우 useReducer의 경우가 더 나을 수 있다 

### custom Hook 만들기 

useState,useEffect,useReducer등의 기존의 훅들을 사용하여서 커스텀 훅을 만들 수 있다 


### Context API

리액트 프로젝트에서 전역적으로 사용할 데이터가 있을때 유용한 기능 

다른 파일에서 정의를 한 후 다른 곳에서 사용이 가능하다

- 사용방법 예시 

```
const myContext = createContext('default'); //전역적으로 관리할 데이터가 들어갈 변수를 createContext라는 hook을 활용해서 생성하기 
return (
    <myContext.Provider value="Hello">
        <Text />
    </myContext.Provider> 
) // 변수 값을 myContext.provider를 활용해서 할당해주기
```

### immer 

해당 라이브러리를 사용하게 되면 불변성을 해치는 코드를 작성해도 불변성을 유지해준다 

react native에서는 사용하지 못한다

설치 코드 yarn add immer

사용방법 
```
const nextArr = produce(array, draft => {
    draft.push({id: 4 , text:'blal'})
    draft[0].text = draft[0].text + ' hello';
})
// 값을 변경시키고자 하는 arr 객체에 prduce를 사용한다 변경시키고자하는 arr, 그 해당 arr를 지칭하는 draft를 차례대로 인수로 가진다 
```