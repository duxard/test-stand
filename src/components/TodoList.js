import React from 'react';
import ListItem from './ListItem';
import axios from 'axios';

import './css/todoList.scss';

export default class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      inputText: "",
      todos: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
/*
  async componentDidMount() {
    try {
      const response = await fetch('https://asta-web-1.herokuapp.com/api/todo');
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const jsonData = await response.json();
      this.setState({
        todos: jsonData
      });
    } catch(e) {
      console.error(e);
    }
  }
*/
  componentDidMount() {
    axios.get('https://asta-web-1.herokuapp.com/api/todo', {timeout: 1500})
      .then(response => {
        const jsonResponse = response.data;
        this.setState({todos: jsonResponse}, () => {
          console.log( this.state.todos );
        });
      })
      .catch(e => console.error( e ));
  }

  handleChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleDelete(e) {
    console.log('delete');
  }

  render() {
    return (
      <div className="row">

        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="newHerokyItem">Add item: </label>
              <input type="text" id="newHerokyItem"
                className="validate"
                value={this.state.inputText}
                onChange={this.handleChange}
              />
              <button className="btn waves-effect waves-light center-align" type="submit">Submit
                <i className="material-icons" />
              </button>
            </div>
            <div className="input-field col s12">
              <ul id="list">
                {
                  this.state.todos.length ? (
                    this.state.todos.map((item, index) => {
                      return (
                        <ListItem key={index}
                                  dataItemId={item._id}
                                  item={item.item}
                                  parentHandleDelete={this.handleDelete}
                        />
                      )
                    })
                  ) : (
                    <p id="todosLoadingStatus">Nothing to show</p>
                  )
                }
              </ul>
            </div>
          </div>
        </form>

      </div>
    );
  }
}
