import React, { Component } from 'react';

import EditableInput from '../../Input/EditableInput';

import './List.css';

export default class List extends Component {
  render() {
    return (
      <div className="list__wrapper">
        <table>
          <thead>
            <tr>
              <th>Completed</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.items.map((item, index) => {
                return (
                  <tr key={index}>
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
                      <EditableInput
                        text={item.description}
                        changeCallback={this.props.descriptionChange}
                        blurCallback={this.props.blurCallback}
                        editing={item.editingDescription}
                        index={index}
                      />
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
