import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

  componentWillMount() {
    // fetch('http://localhost:8001/notes', {
    //   method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   mode: "no-cors", // no-cors, cors, *same-origin
    //   // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "include", // include, same-origin, *omit
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     'Access-Control-Allow-Origin': 'http://localhost:3000/',
    //     'Connection': 'keep-alive'
    //   },
    // })
    fetch('http://localhost:8001/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset-utf-8',
      },
    })
    .then(function(response) {
      console.log('jsoning...', response);
      return response.json();
    })
    .then(function(myJson) {
      console.log('got the response...');
      console.log(myJson);
      console.log('HELLO WORLDY');
      console.log('HELLO WORLDY');
      console.log('HELLO WORLDY');
      console.log('HELLO WORLDY');
      console.log('HELLO WORLDY');
    });

    console.log('we ran the fetch...');
  }
}

export default App;
