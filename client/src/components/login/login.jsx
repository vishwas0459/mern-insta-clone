import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';
class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  validate = () => {
    const schema = {
      username: Joi.string()
        .required()
        .label('Username'),
      password: Joi.string()
        .required()
        .label('Password')
    };
    const account = {
      username: this.state.username,
      password: this.state.password
    };
    console.log('Account', account);
    const result = Joi.validate(account, schema, {
      abortEarly: false
    });
    const errors = {};
    if (result.error) {
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    }
    return errors;
  };
  onSubmitLogin = async event => {
    event.preventDefault();
    console.log(
      'Submit Login',
      this.state.username + ' ' + this.state.password
    );
    const errors = this.validate();
    // check the input before submitting to server.
    console.log('errors', errors);
    if (errors) {
      this.setState({ errors: errors || {} });
    }
    console.log('user', this.state.username);
    try {
      const response = await axios.post('/api/auth', {
        username: this.state.username,
        password: this.state.password
      });
      if (response) {
        console.log('response', response);
        localStorage.setItem('mern-token', response.headers['x-auth-token']);
        console.log(localStorage.getItem('mern-token'));
        console.log('this.props', this.props);
        this.props.history.push('/userList');
      }
    } catch (error) {
      console.log('frontend error', error);
    }
  };
  handleInputChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.id]: currentTarget.value });
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmitLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={event => this.handleInputChange(event)}
            />
            {this.state.errors.username && (
              <p className="alert alert-danger">{this.state.errors.username}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={event => this.handleInputChange(event)}
            />
            {this.state.errors.password && (
              <p className="alert alert-danger">{this.state.errors.password}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
