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