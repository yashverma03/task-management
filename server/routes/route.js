import express from 'express';
import { addTask, updateTask, getTasks, deleteTask } from '../controller/taskController.js';

const router = express.Router();

router.post('/task', addTask);
router.get('/task', getTasks);
router.patch('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

export default router;
