import React from 'react';
import Task from '../Task/Task';
import './Home.css';

const Home = () => {
  return (
    <div className='tasks'>
      <Task category='todo' categoryTitle='To do' />
      <Task category='doing' categoryTitle='Doing' />
      <Task category='done' categoryTitle='Done' />
    </div>
  );
};

export default Home;
