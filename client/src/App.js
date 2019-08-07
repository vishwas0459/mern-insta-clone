import React from 'react';
import './App.css';
import axios from 'axios';
import Login from './components/login/login';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/home';
class App extends React.Component {
  state = {
    email: '',
    password: '',
    data: null
  };
  onSubmitLogin = async event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log('Login Form Submitted!!!', user);
    try {
      const resp = await axios.post('/login', user);
      console.log(resp.data[0]);
      this.setState({ data: resp.data[0] });
    } catch (error) {
      console.log('Something went wrong from client', error);
    }
    //TODO:: Get the token from backend after successful login and redirect to new page
    // console.log(this.state.data);
    // this.setState({ data: resp });
  };
  handleInputChange = ({ currentTarget }) => {
    // console.log(currentTarget.value);
    this.setState({ [currentTarget.id]: currentTarget.value });
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
          <Route
            path="/"
            exact={true}
            render={props => (
              <Login
                {...props}
                onSubmitLogin={this.onSubmitLogin}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                password={this.state.password}
              />
            )}
          />
          <Route
            path="/home"
            render={props => <Home {...props} user={this.state.email} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
