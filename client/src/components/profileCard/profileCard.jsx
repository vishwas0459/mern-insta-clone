import React from 'react';
const ProfileCard = props => {
  return (
    <div className="card" key={props.user._id}>
      <img
        src={props.user.pictureUrl}
        className="card-img-top"
        alt={props.user.email}
      />
      <div className="card-body">
        <h5 className="card-title">{props.user.name}</h5>
        <p className="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p className="card-text">
          <small className="text-muted">Last updated 3 mins ago</small>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
