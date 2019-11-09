import React from 'react';

const ListItem = props => {
  return (
    <li key={props.id} data-itemid={props.dataItemId}>
      <div className="trow">
        <div className="tleft">
          <p>{props.item}</p>
        </div>
        <div className="tright">
          <button className="btn deleteBtn" onClick={props.parentHandleDelete}>Delete</button>
        </div>
      </div>
    </li>
  )
}

export default ListItem;
