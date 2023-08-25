import React from 'react';
import Task from '../Task/Task';
import './Home.css';

const Home = () => {
  return (
    <div className='tasks'>
      <Task type='To do' />
      <Task type='Doing' />
      <Task type='Done' />
    </div>
  );
};

export default Home;
