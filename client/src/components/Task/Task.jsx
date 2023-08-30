import React, { useEffect, useState } from 'react';
import './Task.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import apiUrl from '../../utils/config';

const Task = ({ category, categoryTitle }) => {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState(''); // Separate state for new item title
  const [newDescription, setNewDescription] = useState(''); // Separate state for new item description
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState(''); // Separate state for editing item title
  const [editDescription, setEditDescription] = useState(''); // Separate state for editing item description

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/task?category=${category}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [category]);

  const toggleNewItemInput = () => {
    setShowNewItemInput(!showNewItemInput);
    setEditingIndex(-1);
    setNewTitle('');
    setNewDescription('');
    setEditTitle('');
    setEditDescription('');
  };

  const handleAddItem = async () => {
    if (newTitle && newDescription) {
      try {
        // Send a POST request to create a new task
        await axios.post(`${apiUrl}/task`, {
          title: newTitle,
          description: newDescription,
          category: category,
        });
        // After successful creation, fetch tasks again to update the list
        fetchTasks();
        setNewTitle('');
        setNewDescription('');
        setShowNewItemInput(false);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleUpdateItem = async () => {
    if (editTitle && editDescription && editingIndex !== -1) {
      try {
        // Send a PATCH request to update an existing task
        await axios.patch(`${apiUrl}/task/${items[editingIndex]._id}`, {
          title: editTitle,
          description: editDescription,
        });
        // After successful update, fetch tasks again to update the list
        fetchTasks();
        setEditingIndex(-1);
        setEditTitle('');
        setEditDescription('');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleEditItem = (index) => {
    const itemToEdit = items[index];
    setEditTitle(itemToEdit.title);
    setEditDescription(itemToEdit.description);
    setNewTitle('');
    setNewDescription('');
    setEditingIndex(index);
  };

  const handleDeleteItem = async (index) => {
    try {
      // Send a DELETE request to delete a task
      await axios.delete(`${apiUrl}/task/${items[index]._id}`);
      // After successful deletion, fetch tasks again to update the list
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 mx-auto'>
          <div className='task-card'>
            <h3 className='mb-4'>{categoryTitle}</h3>
            {items.map((item, index) => (
              <div className='task-item d-flex justify-content-between align-items-center' key={index}>
                {index === editingIndex ? (
                  <div >
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Title'
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Description'
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button
                      className='btn btn-success btn-sm update-btn'
                      onClick={() => handleUpdateItem()} // Use handleUpdateItem for updating
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div className='task-saved' onClick={() => handleEditItem(index)}>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                )}
                <button
                  className='btn btn-danger btn-sm delete-btn'
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </div>
            ))}

            {showNewItemInput ? (
              <div>
                <div className='mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Title'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Description'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <button className='btn btn-primary mb-3 add-btn' onClick={handleAddItem}>
                  Add Card
                </button>
              </div>
            ) : (
              <button className='btn btn-outline-primary mb-3' onClick={toggleNewItemInput}>
                + Add a card
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
