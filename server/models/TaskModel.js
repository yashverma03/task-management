import mongoose from 'mongoose';

const taskCategory = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done'
};

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: Object.values(taskCategory),
    default: taskCategory.TODO
  }
});

const TaskModel = mongoose.model('tasks', taskSchema);

export default TaskModel;
