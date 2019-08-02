import React from 'react';
import './App.css';
import Login from './components/login/login';

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
      <Login />
    </React.Fragment>
  );
}

export default App;
