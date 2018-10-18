import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Main from './Main'

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
