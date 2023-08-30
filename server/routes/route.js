import express from 'express';
import TaskModel from '../models/TaskModel.js';

const router = express.Router();

router.post('/task', async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newTask = await TaskModel.create({
      title, description, category,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/task', async (req, res) => {
  try {
    const category = req.query.category;

    const filter = category ? { category } : { category: 'to do' };

    const tasks = await TaskModel.find(filter);

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id },
      { title, description, category },
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
});

router.delete('/task/:id', async (req, res) => {
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
});

export default router;
