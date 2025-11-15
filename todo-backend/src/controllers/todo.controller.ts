import { Response } from 'express';
import Todo from '../models/ToDo';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all todos for logged in user
// @route   GET /api/todos
export const getTodos = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user?._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching todos',
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
export const getTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this todo',
      });
      return;
    }

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching todo',
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
export const createTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: 'Please provide a title',
      });
      return;
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating todo',
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
export const updateTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to update this todo',
      });
      return;
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }) as any;

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      todo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating todo',
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
export const deleteTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to delete this todo',
      });
      return;
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting todo',
    });
  }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
export const toggleTodoCompletion = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    // Make sure user owns the todo
    if (todo.user.toString() !== req.user?._id.toString()) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to update this todo',
      });
      return;
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo status updated successfully',
      todo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error toggling todo completion',
    });
  }
};