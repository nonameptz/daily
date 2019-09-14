import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Main from './Main'

class App extends Component {
  constructor(props, context) {
    super(props, context);

    if (window.location.pathname === '/dog') {
      document.body.style.backgroundColor = "#ff93ea";
    }
  }
  render() {
    return (
      <div className="main-app">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
