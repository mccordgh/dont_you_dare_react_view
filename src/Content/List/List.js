import React, { Component } from 'react';

import './List.css';

export default class List extends Component {
  render() {
    return (
      <div>
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
              this.props.items.map(item => (
                <tr  key={item._id}>
                  <td><input type="checkbox" defaultChecked={item.completed} /></td>
                  <td>{ item.title }</td>
                  <td>{ item.description }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
