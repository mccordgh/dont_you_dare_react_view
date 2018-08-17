import React, { Component } from 'react';

import './EditableInput.css';

export default class EditableInput extends Component {
  render() {
    const inputOrSpan = this.props.editing
      ? (<input
          type="text"
          data-index={this.props.index}
          onBlur={this.props.blurCallback}
          onKeyUp={this.keyUpHandler}
          onInput={this.props.changeCallback}
          defaultValue={this.props.text}
        />)
      : (<span data-index={this.props.index}>{ this.props.text }</span>)

    return (
      <div>
        { inputOrSpan }
      </div>
    );
  }

  keyUpHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.titleBlurHandler(event, event.target.dataset.index);
    }
  }
}
