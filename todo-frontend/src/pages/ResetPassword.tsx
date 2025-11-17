import { Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';
import { useAuthStore } from '../store/authStore';

export const ResetPassword = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <ResetPasswordForm />
      </div>
    </Layout>
  );
};