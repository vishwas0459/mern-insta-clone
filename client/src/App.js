import React from 'react';
import './App.css';
import Login from './components/login/login';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
function App() {
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
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
