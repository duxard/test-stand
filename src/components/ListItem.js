import React from 'react';

const ListItem = props => {
  return (
    <li key={props.key} data-itemid={props.dataItemId}>
      <span>{props.item}</span>
      <button className="btn" onClick={props.handleDelete}>Delete</button>
    </li>
  )
}

export default ListItem;
