import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ListFilter, Plus } from 'lucide-react';
import { todoApi } from '../../api/todo.api';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { Loader } from '../ui/Loader';
import { EmptyState } from '../ui/EmptyState';

type FilterType = 'all' | 'active' | 'completed';

export const TodoList = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
  });

  if (isLoading) return <Loader fullScreen />;

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600">Failed to load todos. Please try again.</p>
      </div>
    );
  }

  const todos = data?.todos || [];

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <ListFilter className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Active</p>
              <p className="text-3xl font-bold text-orange-700 mt-1">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-3xl font-bold text-green-700 mt-1">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Create Todo Form */}
      {showForm && (
        <div className="card p-6 animate-slide-down">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Create New Todo</h3>
          <TodoForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Add Todo Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full btn-primary flex items-center justify-center gap-2 py-4"
        >
          <Plus className="w-5 h-5" />
          Add New Todo
        </button>
      )}

      {/* Filter Tabs */}
      {todos.length > 0 && (
        <div className="card p-2 flex gap-2">
          {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold capitalize transition-all ${
                filter === filterType
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <EmptyState
            title={
              filter === 'all'
                ? 'No todos yet'
                : filter === 'active'
                ? 'No active todos'
                : 'No completed todos'
            }
            description={
              filter === 'all'
                ? 'Create your first todo to get started!'
                : filter === 'active'
                ? 'All your tasks are completed! 🎉'
                : 'Complete some todos to see them here'
            }
            actionLabel="Create Todo"
            onAction={() => setShowForm(true)}
          />
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        )}
      </div>
    </div>
  );
};