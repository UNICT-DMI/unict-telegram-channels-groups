import React from 'react';
import logo from './logo.svg';
import './App.css';

class Greeting extends React.Component<{ name: string }> {
  render() {
    return <h1 className="greeting">Hello {this.props.name}!</h1>;
  }
}

class InputField extends React.Component<{}, { nameValue: string, showingGreeting: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { nameValue: '', showingGreeting: false };
  }

  updateState(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ nameValue: event.target.value });
  }

  render() {
    return (
      <div>
        <h2 className="nameText">Insert your name below</h2>
        <input className="inputField" onChange={(e) => this.updateState(e)}></input>
        <button className="submitButton" onClick={() => this.setState({showingGreeting : true})}>Submit</button>
        {this.state.showingGreeting && <Greeting name={this.state.nameValue} />}
      </div>
    );
  }
}

class Logo extends React.Component {
  logoSVG = <img className="logo" src={logo} alt={"React logo"} width={500}></img>;

  render() {
    return (
      <div>{this.logoSVG}</div>
    );
  }
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
