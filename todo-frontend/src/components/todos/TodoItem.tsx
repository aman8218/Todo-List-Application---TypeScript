import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit, CheckCircle2, Circle, Calendar } from 'lucide-react';
import type { Todo } from '../../types';
import { todoApi } from '../../api/todo.api';
import { EditTodoModal } from './EditTodoModal';
import { ConfirmModal } from '../ui/ConfirmModal';
import { toast } from 'sonner';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleTodoMutation = useMutation({
    mutationFn: () => todoApi.toggleTodo(todo._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success(
        todo.completed ? 'Todo marked as incomplete' : 'Todo completed! 🎉'
      );
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => todoApi.deleteTodo(todo._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully');
      setIsDeleteModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
    },
  });

  const handleToggle = () => {
    toggleTodoMutation.mutate();
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className="card p-5 hover:shadow-2xl transition-all duration-300 animate-slide-up group">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            disabled={toggleTodoMutation.isPending}
            className="mt-1 flex-shrink-0 transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            {todo.completed ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-100" />
            ) : (
              <Circle className="w-6 h-6 text-slate-400 hover:text-blue-600" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold mb-1 transition-all ${
                todo.completed
                  ? 'text-slate-400 line-through'
                  : 'text-slate-800'
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`text-sm mb-2 ${
                  todo.completed ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {todo.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {formatDate(todo.createdAt)}</span>
            </div>
          </div>

          {/* Actions - Always visible on mobile, hover visible on desktop */}
          <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={deleteTodoMutation.isPending}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        {todo.completed && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditTodoModal todo={todo} onClose={() => setIsEditModalOpen(false)} />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Todo?"
        message="Are you sure you want to delete this todo? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteTodoMutation.isPending}
      />
    </>
  );
};