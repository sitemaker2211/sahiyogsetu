import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminReportsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const serviceDemand = [
    { service: 'Plumbing', requests: 120, percentage: 100 },
    { service: 'Electrical', requests: 95, percentage: 79 },
    { service: 'Cleaning', requests: 70, percentage: 58 },
    { service: 'Carpentry', requests: 45, percentage: 38 },
    { service: 'Painting', requests: 30, percentage: 25 }
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
              Reports & Overview
            </h1>
            <p className="text-gray-600 text-lg">
              View insights and statistics about your cooperative.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-2">Most Requested Service</h3>
              <p className="text-xl font-bold text-primary">Plumbing</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👷</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-2">Most Active Worker</h3>
              <p className="text-xl font-bold text-primary">Rajesh Kumar</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-2">Average Worker Rating</h3>
              <p className="text-xl font-bold text-primary">4.7 ★</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-saffron/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-2">Completed Services</h3>
              <p className="text-xl font-bold text-primary">356</p>
            </div>
          </div>

          {/* Service Demand Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Service Demand</h2>
            <div className="space-y-6">
              {serviceDemand.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800 font-medium">{item.service}</span>
                    <span className="text-gray-600 text-sm">{item.requests} requests</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
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

export default AdminReportsPage;
