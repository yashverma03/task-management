import React, { useState } from 'react';
import './Task.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Task = ({ category, categoryTitle }) => {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState(''); // Separate state for new item title
  const [newDescription, setNewDescription] = useState(''); // Separate state for new item description
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState(''); // Separate state for editing item title
  const [editDescription, setEditDescription] = useState(''); // Separate state for editing item description

  // Define the toggleNewItemInput function
  const toggleNewItemInput = () => {
    setShowNewItemInput(!showNewItemInput);
    setEditingIndex(-1); // Reset editingIndex when toggling
    setNewTitle(''); // Reset new item title
    setNewDescription(''); // Reset new item description
    setEditTitle(''); // Reset editing item title
    setEditDescription(''); // Reset editing item description
  };

  const handleAddItem = () => {
    if (newTitle && newDescription) {
      // Add a new item
      setItems([...items, { title: newTitle, description: newDescription }]);
      setNewTitle(''); // Reset new item title
      setNewDescription(''); // Reset new item description
      setShowNewItemInput(false);
    }
  };

  const handleUpdateItem = () => {
    if (editTitle && editDescription && editingIndex !== -1) {
      // If editing an existing item, update it
      const updatedItems = [...items];
      updatedItems[editingIndex] = { title: editTitle, description: editDescription };
      setItems(updatedItems);
      setEditingIndex(-1); // Reset editingIndex
      setEditTitle(''); // Reset editing item title
      setEditDescription(''); // Reset editing item description
    }
  };

  const handleEditItem = (index) => {
    const itemToEdit = items[index];
    setEditTitle(itemToEdit.title); // Set the editing item title
    setEditDescription(itemToEdit.description); // Set the editing item description
    setNewTitle(''); // Reset new item title
    setNewDescription(''); // Reset new item description
    setEditingIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
