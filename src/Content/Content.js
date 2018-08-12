import React, { Component } from 'react';
import List from './List/List';

import ItemRequests from '../Requests/item-requests';

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
    ItemRequests.getItems(this);
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
    if (!item._id) {
      this.createItem(index)

      return;
    }

    this.updateItem(index);
  }

  createItem(index) {
    ItemRequests.createItem(this, index);
  }

  deleteItem = (event) => {
    const index = event.target.dataset.index;

    ItemRequests.deleteItem(this, index);
  }

  updateItem(index) {
    ItemRequests.updateItem(this, index);
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
