import React from 'react';
import './App.css';
import Register from './components/register/register';
import { NavLink, Route, Switch } from 'react-router-dom';
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/login">
            <i className="fa fa-user-o" aria-hidden="true" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/userList">
                  Find User
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/register" exact={true} component={Register} />
          <Route path="/userList" exact={true} component={UserList} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/" exact={true} component={Home} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
