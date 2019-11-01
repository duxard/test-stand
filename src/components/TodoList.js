import React from 'react';

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate"/>
              <label for="email">Email</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
