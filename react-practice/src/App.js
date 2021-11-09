import React, {useRef,useState} from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";



function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const {username, email} = inputs
  const onChange = e => {
    const{name, value} = e.target
    setInputs({
      ...inputs,
      [name]:value
    })
  }
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

  const onCreate = () => {
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
  }

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const onToggle = id => {
    setUsers(users.map(
      user => user.id === id 
      ? {...user, active: !user.active}
      : user
    ))
  }
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
    </>
    
  );
}

export default App;
