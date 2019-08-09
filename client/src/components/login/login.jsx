import React, { Component } from 'react';
import axios from 'axios';
class Login extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    data: null
  };

  handleInputChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.id]: currentTarget.value });
  };
  onSubmitLogin = async event => {
    console.log('submit login');
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    console.log('users', user);

    axios
      .post('/api/users', user)
      .then(res => console.log('user saved successfully...', res.data))
      .catch(err => console.log(err.message));
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmitLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.email}
              onChange={event => this.handleInputChange(event)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          </div>

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
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
