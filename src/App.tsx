import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Greeting(props: any) {
  return <h1 className="greeting">Hello {props.name}!</h1>;
}

function InputField() {
  let [nameValue, updateState] = useState<string>('');
  let [showingGreetings, toggleGreetings] = useState<boolean>(false);

  return (
    <div>
      <h2 className="nameText">Insert your name below</h2>
      <input className="inputField" autoFocus={true} onChange={(e) => updateState(nameValue = e.target.value)}></input>
      <span className="span"></span>
      <button className="submitButton" onClick={() => toggleGreetings(showingGreetings = true)}>Submit</button>
      <span className="span"></span>
      {showingGreetings && <Greeting name={nameValue} />}
    </div>
  );
}

function Logo() {
  let logoSVG = <img className="logo" src={logo} alt={"React logo"} width={500}></img>;

  return (
    <div>{logoSVG}</div>
  );
}

function App() {
  return (
    <div>
      <InputField />
      <Logo />
    </div>
  );
}

export default App;
