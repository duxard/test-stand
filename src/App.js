import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import TodoList from './components/TodoList';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import './index.css';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={process.env.DOC_ROOT} || ''}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/todolist' component={TodoList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
