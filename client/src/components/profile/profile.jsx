import React from 'react';
import axios from 'axios';

// const getUserData = async id => {
//   const { data } = await axios.get('/api/users/' + id);
//   //   console.log(data);
//   return data;
// };
const Profile = props => {
  //   return <p>I am user profile::::::::: {props.match.params.id}</p>;
  //   getUserData(props.match.params.id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-3">
          <p>I am user profile::::::::: {'hi ' + props.match.params.id}</p>
          {/* <ProfileCard user={}/> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
