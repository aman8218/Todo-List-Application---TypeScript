import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;