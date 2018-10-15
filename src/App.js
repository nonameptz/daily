import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    var date = new Date().toJSON().slice(0,10);
    this.dateUrl = '/gifs/dogs/' + date + '.gif';
  }

  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h2 className="daily-header">Here is your Daily Dog 🐶</h2>
          <a href="tg://resolve?domain=daily_dog">
            <img src={this.dateUrl} className="daily-picture" alt="logo" />
          </a>
          <p>Follow our telegram <a href="tg://resolve?domain=daily_dog">channel</a>!</p>
        </header>
      </div>
    );
  }
}

export default App;
