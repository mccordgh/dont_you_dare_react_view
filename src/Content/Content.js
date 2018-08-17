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
      <div>
        <div className="content_header--wrapper">
          <h1>ToDon't List</h1>
          <p>A collection of bad habits</p>
          <button className="button__add--new-item" onClick={this.addButtonHandler}>+</button>
        </div>

        <div className="content--wrapper">
          <List
            items={this.state.items}
            titleChangeHandler={this.titleChangeHandler}
            titleBlurHandler={this.titleBlurHandler.bind(this)}
            iDidItCallback={this.iDidItHandler}
            deleteCallback={this.deleteItem}
            editCallback={this.editItem}
          />
        </div>
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

  titleBlurHandler = (event) => {
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

  iDidItHandler = (event) => {
    const index = event.target.dataset.index;
    const items = this.state.items;
    const item = this.state.items[index];

    items[index] = Object.assign(items[index], { completedCount: item.completedCount + 1 })
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
        completedCount: 0,
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
