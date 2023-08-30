import express from 'express';
import TaskModel from '../models/TaskModel.js';

const router = express.Router();

router.post('/task', async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const savedTask = await TaskModel.findOneAndUpdate(
      { title },
      { title, description, category },
      { upsert: true, new: true }
    );

    res.status(201).json(savedTask);
  } catch (error) {
    console.log('Error created/ updating task:', error);
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

export default router;
