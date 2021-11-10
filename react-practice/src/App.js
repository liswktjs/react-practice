import React, {useRef,useState, useMemo, useCallback} from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는 중');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const {username, email} = inputs
  const onChange = useCallback (e => {
    const{name, value} = e.target
    setInputs({
      ...inputs,
      [name]:value
    })
  }, [inputs]);
  const [users,setUsers] = useState([
    {
        id: 1,
        username: 'name1',
        email: 'name1@gmail.com',
        active: true,
    },
    {
        id: 2,
        username: 'name2',
        email: 'name2@gmail.com',
        active: true,
    },
    {
        id: 3,
        username: 'name3',
        email: 'name3@gmail.com',
        active: false,
    }
  ])

  const nextId = useRef(4);

  const onCreate = useCallback (() => {
    const user = {
      id: nextId.current,
      username,
      email,
    }
    setUsers([...users, user]);
    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1;
  },[username, email, users])

  const onRemove = useCallback (id => {
    setUsers(users.filter(user => user.id !== id))
  }, [users])

  const onToggle = useCallback (id => {
    setUsers(users.map(
      user => user.id === id 
      ? {...user, active: !user.active}
      : user
    ))
  })
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
    <CreateUser 
    username={username} 
    email={email} 
    onChange={onChange} 
    onCreate={onCreate} 
    />
    <UserList users={users}
    onRemove={onRemove}
    onToggle={onToggle}/>
    <div>사용자 수 : {count}</div>
    </>
    
  );
}

export default App;
