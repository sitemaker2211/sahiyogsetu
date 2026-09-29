import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WorkerJobsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock jobs data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      service: 'Plumbing Service',
      customer: 'Rahul M.',
      date: '28 Sept 2026',
      time: '3:00 PM',
      payment: 500,
      status: 'accepted'
    },
    {
      id: 2,
      service: 'Plumbing Service',
      customer: 'Vikram S.',
      date: '25 Sept 2026',
      time: '9:00 AM',
      payment: 400,
      status: 'completed'
    },
    {
      id: 3,
      service: 'Plumbing Service',
      customer: 'Priya S.',
      date: '20 Sept 2026',
      time: '2:00 PM',
      payment: 350,
      status: 'completed'
    },
    {
      id: 4,
      service: 'Plumbing Service',
      customer: 'Amit K.',
      date: '15 Sept 2026',
      time: '11:00 AM',
      payment: 450,
      status: 'completed'
    }
  ]);

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/worker-dashboard', active: false },
    { name: 'Job Requests', icon: '📋', path: '/worker-dashboard', active: false },
    { name: 'My Jobs', icon: '📅', path: '/worker-jobs', active: true },
    { name: 'Earnings', icon: '💰', path: '/worker-earnings', active: false },
    { name: 'Ratings', icon: '⭐', path: '/worker-ratings', active: false },
    { name: 'Availability', icon: '🕐', path: '/worker-dashboard', active: false },
    { name: 'Profile', icon: '👤', path: '/worker-profile', active: false },
    { name: 'Logout', icon: '🚪', path: '/', active: false },
  ];

  const handleMarkCompleted = (jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'completed' } : job
    ));
    alert('Job marked as completed!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingJobs = jobs.filter(j => j.status === 'accepted');
  const acceptedJobs = jobs.filter(j => j.status === 'accepted');
  const completedJobs = jobs.filter(j => j.status === 'completed');

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

          <h1 className="text-3xl font-bold text-primary mb-8">My Jobs</h1>

          {/* Pending/Accepted Jobs */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Pending</h2>
            {pendingJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
                <p className="text-gray-600">No pending jobs.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-semibold text-primary text-lg mb-2">{job.service}</h3>
                        <p className="text-gray-600 text-sm">Customer: {job.customer}</p>
                        <p className="text-gray-600 text-sm">Date: {job.date} at {job.time}</p>
                        <p className="text-gray-600 text-sm">Payment: ₹{job.payment}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                        <button
                          onClick={() => handleMarkCompleted(job.id)}
                          className="bg-primary hover:bg-government-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Mark as Completed
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accepted Jobs */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Accepted</h2>
            {acceptedJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
                <p className="text-gray-600">No accepted jobs.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {acceptedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-semibold text-primary text-lg mb-2">{job.service}</h3>
                        <p className="text-gray-600 text-sm">Customer: {job.customer}</p>
                        <p className="text-gray-600 text-sm">Date: {job.date} at {job.time}</p>
                        <p className="text-gray-600 text-sm">Payment: ₹{job.payment}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Jobs */}
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Completed</h2>
            {completedJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
                <p className="text-gray-600">No completed jobs yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-semibold text-primary text-lg mb-2">{job.service}</h3>
                        <p className="text-gray-600 text-sm">Customer: {job.customer}</p>
                        <p className="text-gray-600 text-sm">Date: {job.date} at {job.time}</p>
                        <p className="text-gray-600 text-sm">Payment: ₹{job.payment}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkerJobsPage;
