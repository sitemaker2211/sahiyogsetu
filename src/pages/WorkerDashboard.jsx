import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WorkerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [available, setAvailable] = useState(true);
  const navigate = useNavigate();
  const [customerBookings, setCustomerBookings] = useState([]);

  // Load customer bookings that are assigned to this worker (mock worker ID 1)
  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
    const workerBookings = allBookings.filter(b => b.workerId === 1);
    setCustomerBookings(workerBookings);
  }, []);

  // Mock worker data
  const worker = {
    name: 'Rajesh Kumar',
    profession: 'Plumber',
    location: 'Vellore',
    verified: true,
    rating: 4.8,
    completedJobs: 120,
    experience: 5
  };

  // Mock job requests
  const [jobRequests, setJobRequests] = useState([
    {
      id: 2,
      service: 'Plumbing Service',
      customer: 'Priya S.',
      location: 'Vellore',
      distance: '3.1 km',
      date: '1 Oct 2026',
      time: '10:00 AM',
      payment: 350,
      description: 'Bathroom pipe replacement.',
      status: 'pending'
    },
    {
      id: 3,
      service: 'Plumbing Service',
      customer: 'Suresh P.',
      location: 'Vellore',
      distance: '1.8 km',
      date: '2 Oct 2026',
      time: '2:00 PM',
      payment: 450,
      description: 'Water tank installation.',
      status: 'pending'
    },
    {
      id: 4,
      service: 'Plumbing Service',
      customer: 'Neha G.',
      location: 'Vellore',
      distance: '4.2 km',
      date: '3 Oct 2026',
      time: '11:00 AM',
      payment: 300,
      description: 'Drainage blockage clearance.',
      status: 'pending'
    }
  ]);

  // Combine mock job requests with customer bookings
  const allJobRequests = [
    ...jobRequests,
    ...customerBookings.filter(b => b.status === 'Request Submitted').map(b => ({
      id: b.id,
      service: b.service,
      customer: 'Demo Customer',
      location: b.location,
      distance: '2.5 km',
      date: b.date,
      time: b.time,
      payment: b.amount,
      description: 'Service request from customer.',
      status: 'pending',
      isCustomerBooking: true,
      bookingId: b.id
    }))
  ];

  // Mock my jobs
  const [myJobs, setMyJobs] = useState([
    {
      id: 5,
      service: 'Plumbing Service',
      customer: 'Rahul M.',
      date: '28 Sept 2026',
      time: '3:00 PM',
      payment: 500,
      status: 'accepted'
    },
    {
      id: 6,
      service: 'Plumbing Service',
      customer: 'Vikram S.',
      date: '25 Sept 2026',
      time: '9:00 AM',
      payment: 400,
      status: 'completed'
    }
  ]);

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/worker-dashboard', active: true },
    { name: 'Job Requests', icon: '📋', path: '/worker-dashboard', active: false },
    { name: 'My Jobs', icon: '📅', path: '/worker-jobs', active: false },
    { name: 'Earnings', icon: '💰', path: '/worker-earnings', active: false },
    { name: 'Ratings', icon: '⭐', path: '/worker-ratings', active: false },
    { name: 'Availability', icon: '🕐', path: '/worker-dashboard', active: false },
    { name: 'Profile', icon: '👤', path: '/worker-profile', active: false },
    { name: 'Logout', icon: '🚪', path: '/', active: false },
  ];

  const handleAcceptJob = (jobId, isCustomerBooking = false, bookingId = null) => {
    if (isCustomerBooking && bookingId) {
      // Update customer booking status
      const allBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
      const updatedBookings = allBookings.map(b => 
        b.id === bookingId ? { ...b, status: 'Worker Accepted', timelineStep: 2 } : b
      );
      localStorage.setItem('customerBookings', JSON.stringify(updatedBookings));
      
      // Update worker bookings
      const workerBookings = JSON.parse(localStorage.getItem('workerBookings') || '{}');
      if (workerBookings[1]) {
        workerBookings[1] = workerBookings[1].map(b =>
          b.id === bookingId ? { ...b, status: 'Worker Accepted', timelineStep: 2 } : b
        );
        localStorage.setItem('workerBookings', JSON.stringify(workerBookings));
      }
      
      // Remove from job requests
      setCustomerBookings(prev => prev.filter(b => b.id !== bookingId));
      alert('Job accepted successfully!');
    } else {
      const job = jobRequests.find(j => j.id === jobId);
      if (job) {
        setJobRequests(prev => prev.filter(j => j.id !== jobId));
        setMyJobs(prev => [...prev, { ...job, status: 'accepted' }]);
        alert('Job accepted successfully!');
      }
    }
  };

  const handleRejectJob = (jobId) => {
    setJobRequests(prev => prev.filter(j => j.id !== jobId));
    alert('Job request rejected.');
  };

  const handleMarkCompleted = (jobId) => {
    setMyJobs(prev => prev.map(job => 
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

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Welcome, {worker.name} 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Here's what's happening with your work today.
            </p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-accent-saffron/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">👷</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">{worker.name}</h2>
                  <p className="text-gray-600">{worker.profession}</p>
                  {worker.verified && (
                    <span className="inline-block bg-accent-green/10 text-accent-green text-xs px-2 py-1 rounded-full mt-1">
                      ✓ Verified Worker
                    </span>
                  )}
                  <p className="text-gray-500 text-sm mt-1">{worker.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-gray-700">Available for Work</span>
                <button
                  onClick={() => setAvailable(!available)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${
                    available ? 'bg-accent-green' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full transition-transform ${
                      available ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <span className="text-3xl font-bold text-primary">{allJobRequests.length}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">New Requests</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <span className="text-3xl font-bold text-primary">
                  {myJobs.filter(j => j.status === 'accepted').length + customerBookings.filter(b => b.status === 'Worker Accepted' || b.status === 'Worker On The Way' || b.status === 'Service Started').length}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Accepted Jobs</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-saffron/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <span className="text-3xl font-bold text-primary">{worker.completedJobs + customerBookings.filter(b => b.status === 'Service Completed').length}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Completed Jobs</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-3xl font-bold text-primary">₹{24500 + customerBookings.filter(b => b.paymentStatus).reduce((sum, b) => sum + b.amount, 0)}</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Total Earnings</h3>
            </div>
          </div>

          {/* New Job Requests */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">New Job Requests</h2>
            {allJobRequests.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
                <p className="text-gray-600">No new job requests at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allJobRequests.map((job) => (
                  <div key={job.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="font-semibold text-primary text-lg mb-2">{job.service}</h3>
                        <p className="text-gray-600 text-sm">Customer: {job.customer}</p>
                        <p className="text-gray-600 text-sm">Location: {job.location}</p>
                        <p className="text-gray-600 text-sm">Distance: {job.distance}</p>
                        <p className="text-gray-600 text-sm">Date: {job.date} at {job.time}</p>
                        <p className="text-gray-600 text-sm">Estimated Payment: ₹{job.payment}</p>
                        <p className="text-gray-600 text-sm mt-2">Description: {job.description}</p>
                        {job.isCustomerBooking && (
                          <span className="inline-block bg-accent-blue/10 text-accent-blue text-xs px-2 py-1 rounded-full mt-2">
                            New Booking
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAcceptJob(job.id, job.isCustomerBooking, job.bookingId)}
                          className="bg-accent-green hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectJob(job.id)}
                          className="bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Jobs */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">My Jobs</h2>
            {myJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
                <p className="text-gray-600">No active jobs at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => (
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
                        {job.status === 'accepted' && (
                          <button
                            onClick={() => handleMarkCompleted(job.id)}
                            className="bg-primary hover:bg-government-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Mark as Completed
                          </button>
                        )}
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

export default WorkerDashboard;
