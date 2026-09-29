import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login - no real authentication
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-government-dark to-government-medium flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Decorative header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-accent-saffron/20 border border-accent-saffron/50 rounded-full px-4 py-1 mb-4">
            <span className="text-accent-saffron text-sm font-semibold">Cooperative Portal</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Cooperative Portal</h1>
          <p className="text-gray-600">Manage verified workers and local service activities.</p>
        </div>

        {/* Demo Note */}
        <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-4 mb-6">
          <p className="text-accent-blue text-sm font-medium text-center">
            📋 Demo Admin Login
          </p>
          <p className="text-gray-600 text-xs text-center mt-1">
            Click Login to access the dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
              placeholder="admin@sahyogsetu.gov.in"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-government-dark text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-accent-blue hover:text-primary font-medium text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
