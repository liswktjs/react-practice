import React, { useState } from 'react';
import './styles/App.scss';
import Button from './component/Button';
import CheckBox from './component/CheckBox';

function App2() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div className="App">
      <div className="button">
        <Button size="large" color="pink">
          Button
        </Button>
        <Button>Button</Button>
        <Button size="small" color="gray">
          Button
        </Button>
      </div>
      <div>
        <CheckBox onChange={onChange} checked={check}>
          Are you agree?
        </CheckBox>
      </div>
    </div>
  );
}
export default App2;
