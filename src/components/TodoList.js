import React from 'react';
import ListItem from './ListItem';
import Spinner from './Spinner';
import axios from 'axios';

import './css/todoList.scss';

export default class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      inputText: "",
      todos: [],
      inputFieldStatus: true,
      postsAreLoading: true
    };

    this.DOM = {};
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
    axios.get('https://asta-web-1.herokuapp.com/api/todo', {timeout:1500})
      .then(response => {
        const jsonResponse = response.data;
        this.setState({
          todos: jsonResponse,
          postsAreLoading: false
        }, () => {
          console.log( "Received data from MongoDB" );
        });
      })
      .catch(e => {
        this.setState({
          postsAreLoading: false
        });
        console.error( e );
      });

      this.DOM.inputTextItem = document.getElementById("newHerokyItem");
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
      inputFieldStatus: ( e.target.value.length ? false : true )
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let itemToSend = this.state.inputText.replace(/^\s+|\s+$/g, "");
    if(!itemToSend) {
      this.showErrorMessage();
      this.setState({
        inputText: ""
      });
      return;
    }

    axios.post('https://asta-web-1.herokuapp.com/api/todo', {
      item: itemToSend
    })
      .then(response => {
        if(response.status === 200 && response.statusText === 'OK') {
          console.log(`Saving data to MongoDB: Success`);
          let newArrayOfTodos = [...this.state.todos, {_id: response.data._id, item: response.data.item}];
          this.setState({
              todos: newArrayOfTodos,
              inputText: "",
              inputFieldStatus: true
          });
          // fix for materialize default behavior
          this.DOM.inputTextItem.classList.remove("valid");
        } else {
            throw new Error(`Server response status: ${response.status}`);
        }
      })
      .catch(e => {
        this.showErrorMessage();
        console.error( `${this.constructor.name}: failed to save to Mongo: ${e}` )
      });
  }

  handleDelete = (removeItemId) => {
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

  submitFormPanel = () => {
    return (
      <form name="form1" className="col s12" onSubmit={this.handleSubmit} autoComplete="off">
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="newHerokyItem">Add item: </label>
            <input type="text"
                    id="newHerokyItem"
                    className="validate"
                    value={this.state.inputText}
                    onChange={this.handleChange}
            />
            <button className="btn waves-effect waves-light center-align"
                    type="submit"
                    disabled={this.state.inputFieldStatus}>Submit
              <i className="material-icons" />
            </button>
          </div>
        </div>
      </form>
    );
  }

  errorMessagePanel = () => {
    return (
      <p ref={elem => this.errorMessage = elem} className="errorMessage hidden center-align">Smth went wrong...</p>
    );
  }

  todoItemsListPanel = () => {
    if (this.state.postsAreLoading) {
      return <Spinner />;
    } else {
      if (this.state.todos.length) {
        return (
          <form name="form2" className="col s12">
            <h3 className="center-align">List of todos</h3>
            <div className="row">
              <div className="input-field col s12">
                <ul id="list">
                  {
                    this.state.todos.map((item, index) => {
                      return (
                        <ListItem key={index}
                                  dataItemId={item._id}
                                  item={item.item}
                                  parentHandleDelete={this.handleDelete}
                        />
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </form>
        );
      } else {
        return (
          <div className="col s12">
            <p id="todosLoadingStatus">"Smth went wrong. Check out console log"</p>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="row">
        { this.submitFormPanel() }
        { this.errorMessagePanel() }
        { this.todoItemsListPanel() }
      </div>
    );
  }
}
