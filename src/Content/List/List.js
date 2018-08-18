import React, { Component } from 'react';

import ListItem from './ListItem/ListItem';

export default class List extends Component {
  render() {
    return (
      <div className="list__wrapper">
        {
          this.props.items.map((item, index) => {
            return (
              <ListItem
                key={index}
                IncrementItemCountHandler={this.props.IncrementItemCountHandler}
                titleChangeHandler={this.props.titleChangeHandler}
                titleBlurHandler={this.props.titleBlurHandler}
                editCallback={this.props.editCallback}
                deleteCallback={this.props.deleteCallback}
                index={index}
                item={item}
              />
            )
          })
        }
      </div>
    );
  }
}
