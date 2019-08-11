import axios from 'axios';
import React, { Component } from 'react';
class UserList extends Component {
  state = {
    data: null
  };
  async componentWillMount() {
    const { data } = await axios.get('/api/users');
    console.log('data', data);
    if (data) this.setState({ data });
  }
  render() {
    return (
      <div>
        <p>I am UserList!!!</p>
        <div>
          {this.state.data &&
            this.state.data.map(d => <li key={d._id}>{d.username}</li>)}
        </div>
      </div>
    );
  }
}

export default UserList;
