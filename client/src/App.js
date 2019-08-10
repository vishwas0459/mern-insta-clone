import React from 'react';
import './App.css';
import axios from 'axios';
import Register from './components/register/register';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
import UserList from './components/userList/userList';
import Login from './components/login/login';
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
          <span>
            {' '}
            <i className="fa fa-user-o" aria-hidden="true" />{' '}
          </span>{' '}
        </h1>
        <Switch>
          <Route path="/register" exact={true} component={Register} />

          <Route path="/userList" exact={true} component={UserList} />
          <Route path="/login" exact={true} component={Login} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
