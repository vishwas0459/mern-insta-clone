import axios from 'axios';
import React, { Component } from 'react';
class UserList extends Component {
  state = {
    data: null
  };
  // async componentWillMount() {
  //   const { data } = await axios.get('/api/users');
  //   console.log('data', data);
  //   if (data) this.setState({ data });
  // }
  saveData = async () => {
    const { data } = await axios.get('https://randomuser.me/api/?results=2');
    await axios.post('/api/seed', data.results);
  };
  render() {
    return (
      <div>
        <p>I am UserList!!!</p>
        <button className="btn btn-primary" onClick={this.saveData}>
          SaveData
        </button>
        <div>
          {this.state.data &&
            this.state.data.map(d => <li key={d._id}>{d.username}</li>)}
        </div>
      </div>
    );
  }
}

export default UserList;
