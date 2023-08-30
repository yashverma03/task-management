import React from 'react';
import Task from '../Task/Task';
import './Home.css';

const Home = () => {
  return (
    <div className='tasks'>
      <Task category='To do' />
      <Task category='Doing' />
      <Task category='Done' />
    </div>
  );
};

export default Home;
