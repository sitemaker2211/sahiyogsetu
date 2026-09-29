import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recentActivities = [
    {
      id: 1,
      activity: 'Rajesh Kumar was verified as a Plumber.',
      time: '2 hours ago',
      icon: '✓',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      activity: 'New booking received from Ankit Sharma.',
      time: '4 hours ago',
      icon: '📋',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      activity: 'Electrical service completed by Amit Sharma.',
      time: '6 hours ago',
      icon: '✅',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      activity: 'New worker registration received.',
      time: '1 day ago',
      icon: '👷',
      color: 'bg-accent-saffron/20 text-accent-saffron'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 bg-primary text-white px-4 py-2 rounded-lg"
          >
            ☰ Menu
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Cooperative Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage workers, bookings and local services.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👷</span>
                </div>
                <span className="text-3xl font-bold text-primary">128</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Total Registered Workers</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <span className="text-3xl font-bold text-primary">110</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Verified Workers</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-saffron/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <span className="text-3xl font-bold text-primary">24</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Currently Active Bookings</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <span className="text-3xl font-bold text-primary">356</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Completed Services</h3>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.activity}</p>
                    <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
