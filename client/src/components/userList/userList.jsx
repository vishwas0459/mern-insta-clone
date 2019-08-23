import axios from 'axios';
import React, { Component } from 'react';
import ProfileCard from '../profileCard/profileCard';
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      serachUser: '',
      foundUsers: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    // console.log(event.currentTarget.value);
    this.setState(
      { [event.currentTarget.name]: event.currentTarget.value.toLowerCase() },
      () => {
        this.findUser(this.state.serachUser);
      }
    );
  }
  findUser = searchUser => {
    let foundUsers = this.state.data.filter(user =>
      user.firstName.toLowerCase().includes(searchUser)
    );
    this.setState({ foundUsers });
  };

  async componentDidMount() {
    const { data } = await axios.get('/api/users');
    console.log('data', data);
    if (data) this.setState({ data });
  }

  render() {
    console.log(this.state.serachUser);
    let data =
      this.state.foundUsers.length !== 0
        ? this.state.foundUsers
        : this.state.data;
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
          {this.state.serachUser.length > 0 &&
          this.state.foundUsers.length === 0 ? (
            <p>No such user in database!!!</p>
          ) : (
            data.map(user => (
              <div className="col-md-3" key={user._id}>
                <ProfileCard user={user} />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default UserList;
