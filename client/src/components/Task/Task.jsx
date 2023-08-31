import React, { useEffect, useState } from 'react';
import './Task.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import apiUrl from '../../utils/config';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Task = ({ category, categoryTitle }) => {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/task?category=${category}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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
    if (newTitle) {
      try {
        const highestOrder = Math.max(...items.map((item) => item.order), -1) + 1;

        await axios.post(`${apiUrl}/task`, {
          title: newTitle,
          description: newDescription,
          category: category,
          order: highestOrder,
        });

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
    if (editTitle && editingIndex !== -1) {
      try {
        await axios.patch(`${apiUrl}/task/${items[editingIndex]._id}`, {
          title: editTitle,
          description: editDescription,
        });

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
      await axios.delete(`${apiUrl}/task/${items[index]._id}`);

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    setItems(reorderedItems);

    const updatedItemsOrder = reorderedItems.map((item, index) => ({
      _id: item._id,
      order: index,
    }));

    try {
      await axios.patch(`${apiUrl}/tasks`, {
        category: category,
        updatedOrder: updatedItemsOrder,
      });
    } catch (error) {
      console.error('Error in updating item orders:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 mx-auto'>
          <div className='task-card'>
            <h3 className='mb-4'>{categoryTitle}</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId='tasks'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} id='tasks'>
                    {items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className='task-item d-flex justify-content-between align-items-center' key={index}>

                              {index === editingIndex ? (
                                <div>
                                  <input type='text' className='form-control' placeholder='Title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                  <input type='text' className='form-control' placeholder='Description' value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                                  <button className='btn btn-success btn-sm update-btn' onClick={() => handleUpdateItem()}>
                                    Update
                                  </button>
                                </div>
                              ) : (
                                <div className='task-saved' onClick={() => handleEditItem(index)}>
                                  <h5>{item.title}</h5>
                                  <p>{item.description}</p>
                                </div>
                              )}

                              <button className='btn btn-danger btn-sm delete-btn' onClick={() => handleDeleteItem(index)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {showNewItemInput ? (
              <div>
                <div className='mb-3'>
                  <input type='text' className='form-control' placeholder='Title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <input type='text' className='form-control' placeholder='Description' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
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
