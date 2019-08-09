import React from 'react';
import './App.css';
// import axios from 'axios';
import Login from './components/login/login';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import Register from './components/register/register';
class App extends React.Component {
  state = {
    email: '',
    password: '',
    data: null
  };
  render() {
    return (
      <React.Fragment>
        <h1>
          Hello From React!!!{' '}
          <span>
            {' '}
            <i className="fa fa-user-o" aria-hidden="true" />{' '}
          </span>{' '}
        </h1>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" exact={true} component={Register} />

          <Route path="/" exact={true} component={Login} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
