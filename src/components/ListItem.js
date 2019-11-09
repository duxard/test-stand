import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.parentHandleDelete(this.props.dataItemId);
  }

  render() {
    return (
      <li key={this.props.id} data-itemid={this.props.dataItemId}>
        <div className="trow">
          <div className="tleft">
            <p>{this.props.item}</p>
          </div>
          <div className="tright">
            <button className="btn deleteBtn" onClick={this.handleClick}>Delete</button>
          </div>
        </div>
      </li>
    )
  }
}
