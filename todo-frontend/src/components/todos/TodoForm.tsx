import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { todoSchema } from '../../schemas/todo.schema';
import type { TodoInput } from '../../schemas/todo.schema';
import { todoApi } from '../../api/todo.api';
import { toast } from 'sonner';

interface TodoFormProps {
  onClose?: () => void;
}

export const TodoForm = ({ onClose }: TodoFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
  });

  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo created successfully! 🎉');
      reset();
      onClose?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create todo');
    },
  });

  const onSubmit = (data: TodoInput) => {
    createTodoMutation.mutate(data);
  };

  return (
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
          rows={3}
          placeholder="Add more details..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={createTodoMutation.isPending}
          className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createTodoMutation.isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create Todo
            </>
          )}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border-2 border-slate-200 hover:border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};