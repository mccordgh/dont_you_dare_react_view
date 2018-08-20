import React, { Component } from 'react';

import './EditableInput.css';

export default class EditableInput extends Component {
  render() {
    const inputOrSpan = this.props.editing
      ? (<input
          type="text"
          data-index={this.props.index}
          onBlur={() => {this.props.titleBlurHandler(this.props.index)}}
          onKeyUp={this.keyUpHandler}
          onInput={(event) => {this.props.titleChangeHandler(this.props.index, event.target.value)}}
          defaultValue={this.props.text}
        />)
      : (<span
            className="editable_input--span"
        >
          { this.props.text }
        </span>)

    return (
      <div className="editable_input--wrapper">
        { inputOrSpan }
      </div>
    );
  }

  keyUpHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.titleBlurHandler(this.props.index);
    }
  }
}
