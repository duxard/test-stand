import React from 'react';
import ListItem from './ListItem';
import axios from 'axios';

import './css/todoList.scss';

export default class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      inputText: "",
      todos: [],
      emptyList: ""
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
      .catch(e => {
        this.setState({
          emptyList: "Smth went wrong. Check out console log"
        });
        console.error( e );
      });
  }

  handleChange(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('https://asta-web-1.herokuapp.com/api/todo', {item: this.state.inputText})
      .then(response => {
        if(response.status === 200 && response.statusText === 'OK') {
          console.log(`${this.constructor.name}: Sending data to MongoDB: Success`);
          let newArrayOfTodos = [...this.state.todos, {_id: response.data._id, item: response.data.item}];
          this.setState({
              todos: newArrayOfTodos,
              inputText: ""
          });
        } else {
            throw new Error(`Server response status: ${response.status}`);
        }
      })
      .catch(e => {
        this.showErrorMessage();
        console.error( `${this.constructor.name}: failed to save to Mongo: ${e}` )
      });
  }

  handleDelete(removeItemId) {
    axios.delete(`https://asta-web-1.herokuapp.com/api/todo/${removeItemId}`)
      .then(response => {
        if(response.status === 200 && response.statusText === 'OK') {
          console.log(`${this.constructor.name}: Deleting from MongoDB: Success`);
          let index = this.state.todos.findIndex(el => el._id === removeItemId);
          let newArrayOfTodos = this.state.todos;
          newArrayOfTodos.splice(index, 1);
          this.setState({
            todos: newArrayOfTodos
          });
        } else {
          throw new Error(`Server response status: ${response.status}`);
        }
      })
      .catch(error => {
        this.showErrorMessage();
        console.error(`${this.constructor.name}: Failed to delete from Mongo: ${error}`)
      });
  }

  showErrorMessage() {
    this.errorMessage.classList.remove("hidden")
    this.errorMessage.classList.add("fademe");
    setTimeout(() => {
      this.errorMessage.classList.remove("fademe");
      this.errorMessage.classList.add("hidden");
    }, 2000);
  }

  render() {
    return (
      <div className="row">

        <form name="form1" className="col s12" onSubmit={this.handleSubmit} autoComplete="off">
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
          </div>
        </form>

        <p ref={elem => this.errorMessage = elem} className="errorMessage hidden">Smth went wrong...</p>
        <form name="form2" className="col s12">
          <div className="row">
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
                    <p id="todosLoadingStatus">{this.state.emptyList}</p>
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
