import React, { Component } from 'react';
import List from './List/List';

import ItemRequests from '../Requests/item-requests';

import './Content.css';

export default class Content extends Component {
  state = {
    items: [],
    dataLoading: true,
  }

  render() {
    const content = this.state.dataLoading
    ? (
      <div class="lds-ring">
        <div>Our</div>
        <div>Bad</div>
        <div>Habits...</div>
        <div>Fetching</div>
      </div>
    )
    : (
      <div className="content--wrapper">
          <p>A collection of bad habits</p>

          <List
            items={this.state.items}
            titleChangeHandler={this.titleChangeHandler}
            titleBlurHandler={this.titleBlurHandler}
            IncrementItemCountHandler={this.IncrementItemCountHandler}
            deleteCallback={this.deleteItem}
            editCallback={this.editItem}
          />
        </div>
    );

    return (
      <div>
        <div className="content_header--wrapper">
          <h1>ToDon't List</h1>
          { this.state.dataLoading ? ('') : (
            <button className="button__add--new-item" onClick={this.addButtonHandler}>
              <i className="fas fa-plus"></i>
            </button>
          ) }
        </div>

        { content }

      </div>
    );
  }

  componentWillMount() {
    ItemRequests.getItems(this)
  }

  titleChangeHandler = (index, title) => {
    const items = this.state.items;

    items[index] = Object.assign(items[index], { title });
    this.setState({ items });
  }

  titleBlurHandler = (index) => {
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

  deleteItem = (index) => {
    ItemRequests.deleteItem(this, index);
  }

  updateItem(index) {
    ItemRequests.updateItem(this, index);
  }

  IncrementItemCountHandler = (index) => {
    const items = this.state.items;
    const item = items[index];

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

  editItem = (index) => {
    const items = this.state.items;

    items[index] = Object.assign(items[index], {
      editingTitle: true,
    });

    this.setState({items});
  }
}
