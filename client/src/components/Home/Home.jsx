import React from 'react';
import Task from '../Task/Task';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h4>Kanban Task Management</h4>

      <div className='tasks'>
        <Task category='todo' categoryTitle='To do' />
        <Task category='doing' categoryTitle='Doing' />
        <Task category='done' categoryTitle='Done' />
      </div>
    </div>
  );
};

export default Home;
