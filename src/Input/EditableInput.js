import React, { Component } from 'react';

// import './List.css';

export default class EditableInput extends Component {
  render() {
    const inputOrSpan = this.props.editing
      ? (<input
          type="text"
          data-index={this.props.index}
          onBlur={this.props.blurCallback}
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
}
