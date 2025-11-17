import { Link } from 'react-router-dom';
import { CheckSquare, Zap, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Home = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Built with modern technologies for optimal performance',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with JWT authentication',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Responsive Design',
      description: 'Works seamlessly on desktop, tablet, and mobile devices',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="container-custom py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-8 shadow-2xl animate-slide-up">
            <CheckSquare className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 animate-slide-up">
            Organize Your Life with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TodoApp
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 animate-slide-up max-w-2xl mx-auto">
            A beautiful, modern, and powerful todo list application to help you stay organized and productive.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-20 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-4">
            Why Choose TodoApp?
          </h2>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to manage your tasks efficiently
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:scale-105 transition-transform duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <div className="card max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-blue-600 to-indigo-600 border-0">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already organizing their lives with TodoApp
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="container-custom py-8 border-t border-slate-200">
        <div className="text-center text-slate-600">
          <p>© 2025 TodoApp. Built with ❤️ using React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
};