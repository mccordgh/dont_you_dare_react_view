import React, { Component } from 'react';

import List from './List/List';

import './Content.css';

export default class Content extends Component {
  state = {
    items: [],
  }

  render() {
    return (
      <div className="content__wrapper">
        <List items={this.state.items} />
      </div>
    );
  }

  componentWillMount() {
    fetch('http://localhost:8001/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset-utf-8',
      },
    })
    .then(response => response.json())
    .then((data) => {
      data = data.map(item => Object.assign(item, { completed: (item.completed === 'true')}))
      this.setState({ items: data });
    });
  }
}
