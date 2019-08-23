import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          Instagram{' '}
          <span>
            {' '}
            <i className="fa fa-bars" aria-hidden="true" />
          </span>
        </Link>
      </div>

      <div className="searchBox">
        <input type="text" placeholder="searchIcon" />
      </div>
      <div className="right">
        <span style={{ margin: '22px' }}>
          <i className="fa fa-globe" aria-hidden="true" />
        </span>
        <span style={{ margin: '22px' }}>
          <i className="fa fa-heart-o" aria-hidden="true" />
        </span>
        <span style={{ margin: '22px' }}>
          <i className="fa fa-user-o" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
