import React from 'react';

const ListItem = props => {
  return (
    <li key={props.id} data-itemid={props.dataItemId}>
      <span>{props.item}</span>
      <button className="btn" onClick={props.parentHandleDelete}>Delete</button>
    </li>
  )
}

export default ListItem;
