import React, { Component } from 'react';

import EditableInput from '../../Input/EditableInput';

import './List.css';

export default class List extends Component {
  render() {
    return (
      <div className="list__wrapper">
        <table>
          <tbody>
            {
              this.props.items.map((item, index) => {
                return (
                  <tr className="list__row" key={index}>
                    <td>
                      <input
                        onInput={this.props.completedCallback}
                        data-index={index}
                        type="checkbox"
                        defaultChecked={item.completed}
                      />
                    </td>

                    <td>
                      <EditableInput
                        text={item.title}
                        changeCallback={this.props.titleChange}
                        blurCallback={this.props.blurCallback}
                        editing={item.editingTitle}
                        index={index}
                      />
                    </td>
                    <td>
                      <button
                        onClick={this.props.editCallback}
                        className="edit__item-button"
                        data-index={index}
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={this.props.deleteCallback}
                        className="delete__item-button"
                        data-index={index}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
