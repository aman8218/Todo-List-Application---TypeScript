import express from 'express';
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoCompletion,
} from '../controllers/todo.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getTodos).post(createTodo);

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

router.patch('/:id/toggle', toggleTodoCompletion);

export default router;