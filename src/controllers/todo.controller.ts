import { Request, Response } from 'express';
import { AppDataSource } from '../index';
import { Todo } from '@/entities';
import logger from '@/config/logger';
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const user = req.currentUser!;

    const todoRepository = AppDataSource.getRepository(Todo);

    const todo = todoRepository.create({
      title,
      description,
      user,
    });

    await todoRepository.save(todo);

    res.status(201).json({
      message: 'Todo created successfully',
      todo,
    });
  } catch (error) {
    logger.error('Create todo error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user = req.currentUser!;

    const todoRepository = AppDataSource.getRepository(Todo);
    const todos = await todoRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });

    res.json(todos);
  } catch (error) {
    logger.error('Get todos error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.currentUser!;

    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    logger.error('Get todo error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const user = req.currentUser!;

    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update todo fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todoRepository.save(todo);

    res.json({
      message: 'Todo updated successfully',
      todo,
    });
  } catch (error) {
    logger.error('Update todo error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.currentUser!;

    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todoRepository.remove(todo);

    res.status(204).send();
  } catch (error) {
    logger.error('Delete todo error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 