import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WorkerEarningsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock earnings data
  const earnings = [
    { id: 1, service: 'Plumbing Service', date: '30 Sept 2026', amount: 400 },
    { id: 2, service: 'Electrical Repair', date: '28 Sept 2026', amount: 500 },
    { id: 3, service: 'Cleaning Service', date: '25 Sept 2026', amount: 300 },
    { id: 4, service: 'Plumbing Service', date: '20 Sept 2026', amount: 350 },
    { id: 5, service: 'Carpentry Work', date: '15 Sept 2026', amount: 450 }
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/worker-dashboard', active: false },
    { name: 'Job Requests', icon: '📋', path: '/worker-dashboard', active: false },
    { name: 'My Jobs', icon: '📅', path: '/worker-jobs', active: false },
    { name: 'Earnings', icon: '💰', path: '/worker-earnings', active: true },
    { name: 'Ratings', icon: '⭐', path: '/worker-ratings', active: false },
    { name: 'Availability', icon: '🕐', path: '/worker-dashboard', active: false },
    { name: 'Profile', icon: '👤', path: '/worker-profile', active: false },
    { name: 'Logout', icon: '🚪', path: '/', active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-primary mb-6">Worker Menu</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-accent-blue/10 text-accent-blue border-2 border-accent-blue/30' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <div className="bg-white w-64 h-full p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-primary mb-6">Worker Menu</h2>
              <nav className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-accent-blue/10 text-accent-blue border-2 border-accent-blue/30' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 bg-primary text-white px-4 py-2 rounded-lg"
          >
            ☰ Menu
          </button>

          <h1 className="text-3xl font-bold text-primary mb-8">Earnings</h1>

          {/* Earnings Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <span className="text-3xl font-bold text-primary">₹800</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Today</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📆</span>
                </div>
                <span className="text-3xl font-bold text-primary">₹4,500</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">This Week</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-saffron/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-3xl font-bold text-primary">₹18,700</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">This Month</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-3xl font-bold text-primary">₹52,400</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Total Earnings</h3>
            </div>
          </div>

          {/* Recent Earnings */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Recent Earnings</h2>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {earnings.map((earning) => (
                      <tr key={earning.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-primary">{earning.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{earning.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-semibold text-accent-green">₹{earning.amount}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkerEarningsPage;
