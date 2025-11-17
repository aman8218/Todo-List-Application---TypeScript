import { ListTodo, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title = 'No todos yet',
  description = 'Create your first todo to get started!',
  actionLabel = 'Create Todo',
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-16 px-4 animate-fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
        <ListTodo className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">{description}</p>
      {onAction && (
        <button onClick={onAction} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};