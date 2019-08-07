import React from 'react';
const Home = props => {
  console.log(props);
  return (
    <div>
      <p>I am Home!!!</p>
      <p>{'Props::' + props}</p>
    </div>
  );
};

export default Home;
