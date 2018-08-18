import React, { Component } from 'react';

import Content from './Content/Content';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="application__wrapper">
        <Content />
      </div>
    );
  }
}
