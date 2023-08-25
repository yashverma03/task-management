import React, { useState } from 'react';
import './Task.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const Task = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const handleAddItem = () => {
    if (title && description) {
      setItems([...items, { title, description }]);
      setTitle('');
      setDescription('');
      setShowNewItemInput(false);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const toggleNewItemInput = () => {
    setShowNewItemInput(!showNewItemInput);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="task-card">
            <h3 className="mb-4">To Do</h3>
            {items.map((item, index) => (
              <div className="item d-flex justify-content-between align-items-center" key={index}>
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
                <button
                  className="btn btn-danger delete-btn"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </div>
            ))}

            {showNewItemInput ? (
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary mb-3" onClick={handleAddItem}>
                  Add card
                </button>
              </div>
            ) : (
              <button className="btn btn-primary mb-3" onClick={toggleNewItemInput}>
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
