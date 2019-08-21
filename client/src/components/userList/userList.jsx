import axios from 'axios';
import React, { Component } from 'react';
import ProfileCard from '../profileCard/profileCard';
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      serachUser: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.currentTarget.value);
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
    this.findUser();
  }
  findUser = () => {
    if (this.state.serachUser) {
      let x = this.state.data.indexOf(this.state.serachUser);
      console.log(typeof this.state.data);
    }
  };

  componentDidMount() {
    if (this.state.serachUser) {
      let findUser = this.state.data.find(user =>
        user.name.include(this.state.serachUser)
      );
      console.log(findUser);
    }
  }
  async componentWillMount() {
    const { data } = await axios.get('/api/users');
    console.log('data', data);
    if (data) this.setState({ data });
  }

  render() {
    return (
      <div className="container">
        <input
          type="text"
          name="serachUser"
          id="serachUser"
          placeholder="enter user name"
          className="form-control mb-3"
          value={this.state.serachUser}
          onChange={event => this.handleChange(event)}
        />
        {/* <button className="btn btn-secondary mt-2 mb-2">Search User</button> */}
        <div className="row">
          {this.state.data &&
            this.state.data.map(user => (
              <div className="col-md-3" key={user._id}>
                <ProfileCard user={user} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default UserList;
