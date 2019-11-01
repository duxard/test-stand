import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Comp1 from './components/Comp1';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import './index.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/create' component={Comp1} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/comp1' component={Comp1} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
