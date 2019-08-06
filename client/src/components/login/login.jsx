import React, { Component } from 'react';
import axios from 'axios';
class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  onSubmitLogin = async event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log('Login Form Submitted!!!', user);
    const resp = await axios.post('/login', user);
    console.log(resp);
    //TODO:: Get the token from backend after successful login and redirect to new page
    // console.log(this.state.data);
    this.props.history.push('/home');
    // this.setState({ data: resp });
  };
  handleInputChange = ({ currentTarget }) => {
    // console.log(currentTarget.value);
    this.setState({ [currentTarget.id]: currentTarget.value });
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.onSubmitLogin(event)}>
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
