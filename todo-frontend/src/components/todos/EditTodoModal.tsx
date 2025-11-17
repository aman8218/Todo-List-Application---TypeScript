import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Save } from 'lucide-react';
import { todoSchema } from '../../schemas/todo.schema';
import type { TodoInput } from '../../schemas/todo.schema';
import { todoApi } from '../../api/todo.api';
import type { Todo } from '../../types';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
}

export const EditTodoModal = ({ todo, onClose }: EditTodoModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description || '',
    },
  });

  useEffect(() => {
    reset({
      title: todo.title,
      description: todo.description || '',
    });
  }, [todo, reset]);

  const updateTodoMutation = useMutation({
    mutationFn: (data: TodoInput) => todoApi.updateTodo(todo._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updated successfully! ✨');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    },
  });

  const onSubmit = (data: TodoInput) => {
    updateTodoMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card p-6 w-full max-w-lg animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Edit Todo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title')}
              className="input-field"
              placeholder="What needs to be done?"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            <textarea
              {...register('description')}
              className="input-field resize-none"
              rows={4}
              placeholder="Add more details..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateTodoMutation.isPending}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateTodoMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};