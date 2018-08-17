import React, { Component } from 'react';

import EditableInput from '../../../Input/EditableInput';

import './ListItem.css';

export default class ListItem extends Component {
  render() {
    const item = this.props.item;

    return (
      <div className="list_item__wrapper">
        <button className="button__add-one" onClick={this.addButtonHandler}>+</button>

        <div className="list_item--count-wrapper">
          { item.completedCount }
        </div>

        <div className="list_item--contents">
          <EditableInput
            text={item.title}
            changeCallback={this.props.titleChange}
            titleBlurHandler={this.props.titleBlurHandler}
            titleChangeHandler={this.props.titleChangeHandler}
            editing={item.editingTitle}
            index={this.props.index}
          />

          <div className="list_item--buttons">
            <button
                onClick={this.props.editCallback}
                className="list_item--button edit__item-button"
                data-index={this.props.index}
              >
                edit
            </button>

            <button
              onClick={this.props.deleteCallback}
              className="list_item--button delete__item-button"
              data-index={this.props.index}
            >
              X
            </button>

            <button
                onClick={this.props.iDidItCallback}
                className="list_item--button increment__item-button"
                data-index={this.props.index}
              >
                +
            </button>
          </div>
        </div>


      </div>


    //   <table>
    //   <tbody>
    //     <tr className="list__row" key={index}>
    //       <td>
    //         <button
    //           onClick={this.props.iDidItCallback}
    //           data-index={this.props.index}
    //         >
    //           Oops! I did it
    //         </button>
    //       </td>

    //       <td>
    //         { item.completedCount } times
    //       </td>

    //       <td>
    //         <EditableInput
    //           text={item.title}
    //           changeCallback={this.props.titleChange}
    //           blurCallback={this.props.blurCallback}
    //           editing={item.editingTitle}
    //           index={this.props.index}
    //         />
    //       </td>
    //       <td>
    //         <button
    //           onClick={this.props.editCallback}
    //           className="edit__item-button"
    //           data-index={this.props.index}
    //         >
    //           edit
    //         </button>
    //       </td>
    //       <td>
    //         <button
    //           onClick={this.props.deleteCallback}
    //           className="delete__item-button"
    //           data-index={this.props.index}
    //         >
    //           X
    //         </button>
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
    )
  }
}