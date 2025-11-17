import { Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/ui/Loader';

export const Dashboard = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container-custom py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-lg text-slate-600">
              Here's what you need to do today
            </p>
          </div>

          {/* Todo List */}
          <TodoList />
        </div>
      </div>
    </Layout>
  );
};