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
        <List
          items={this.state.items}
          titleChange={this.titleChangeHandler}
          blurCallback={this.blurHandler.bind(this)}
          completedCallback={this.completedChangeHandler}
          deleteCallback={this.deleteItem}
          editCallback={this.editItem}
        />

        <button onClick={this.addButtonHandler}>Add Item</button>
      </div>
    );
  }

  componentWillMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch('http://localhost:8001/items', {
      method: 'GET',
    })
    .then(response => response.json())
    .then((data) => {
      data = data.map(item => Object.assign(item, {
        editingTitle: !item.title,
      }));

      this.setState({ items: data });
    });
  }

  titleChangeHandler = (event) => {
    const title = event.target.value;
    const index = event.target.dataset.index;
    const items = this.state.items;

    items[index] = Object.assign(items[index], { title });
    this.setState({ items });
  }

  blurHandler = (event) => {
    const index = event.target.dataset.index;
    const item = this.state.items[index];

    this.updateOrCreateItem(item, index);
  }

  updateOrCreateItem(item, index) {
    if (item._id) {
      this.updateItem(index);
    } else {
      this.createItem(index)
    }
  }

  createItem(index) {
    const item = this.state.items[index];
    const itemObj = {
      title: item.title,
      completed: item.completed,
    }

    fetch('http://localhost:8001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then((data) => {
      this.fetchItems();
    });
  }

  deleteItem = (event) => {
    const index = event.target.dataset.index;
    const item = this.state.items[index];

    fetch(`http://localhost:8001/items/${item._id}`, {
      method: 'DELETE',
    })
    .then((data) => {
      this.fetchItems();
    });
  }

  updateItem(index) {
    const item = this.state.items[index];
    const itemObj = {
      id: item._id,
      title: item.title,
      completed: item.completed,
    }

    fetch(`http://localhost:8001/items/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then((data) => {
      this.fetchItems();
    });
  }

  completedChangeHandler = (event) => {
    const index = event.target.dataset.index;
    const items = this.state.items;
    const item = this.state.items[index];

    items[index] = Object.assign(items[index], { completed: !item.completed})
    this.setState(() => {
      return { items };
    }, () => {
      this.updateOrCreateItem(item, index);
    });
  }

  addButtonHandler = () => {
    this.setState((state) => {
      state.items.push({
        id: null,
        completed: false,
        title: '',
        editingTitle: true,
      })

      return { items: state.items }
    })
  }

  editItem = (event) => {
    const index = event.target.dataset.index;
    const items = this.state.items;

    items[index] = Object.assign(items[index], {
      editingTitle: true,
    });

    this.setState({items});
  }
}
