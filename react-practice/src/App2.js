import React from 'react';
import './styles/App.scss';
import Button from './component/Button';

function App2() {
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
      <div className="button">
        <Button size="large" color="pink" outline={true} fullWidth={true}>
          Button
        </Button>
        <Button>Button</Button>
        <Button size="small" color="gray" outline>
          Button
        </Button>
      </div>
    </div>
  );
}
export default App2;
