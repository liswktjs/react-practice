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