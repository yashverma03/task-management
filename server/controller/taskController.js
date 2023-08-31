import TaskModel from '../models/TaskModel.js';

export const addTask = async (req, res) => {
  try {
    const { title, description, category, order } = req.body;

    const newTask = await TaskModel.create({
      title, description, category, order
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, order } = req.body;

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id },
      { title, description, category, order },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const category = req.query.category;

    const filter = category ? { category } : { category: 'todo' };

    const tasks = await TaskModel.find(filter).sort('order');;

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await TaskModel.findOneAndDelete({ _id: id });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTaskOrder = async (req, res) => {
  try {
    const { updatedOrder } = req.body;

    for (const taskData of updatedOrder) {
      const { _id, order } = taskData;

      await TaskModel.findByIdAndUpdate(_id, { order });
    }

    return res.status(200).json({ message: 'Task order updated successfully' });
  } catch (error) {
    console.error('Error updating task order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
