import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple demo validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Demo login - any email/password works for now
    setSuccess('Login successful! Redirecting to dashboard...');
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to continue with SahyogSetu</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="demo@sahyogsetu.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-government-dark text-white py-3 rounded-lg font-semibold transition-colors border-2 border-primary hover:border-government-dark"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-accent-blue hover:text-accent-green font-semibold transition-colors"
              >
                Register
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-accent-saffron/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 mb-2">Are you a service worker?</p>
              <button
                onClick={() => navigate('/worker-dashboard')}
                className="w-full bg-accent-saffron hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Login as Worker
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Demo credentials: demo@sahyogsetu.com / 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
