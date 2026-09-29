import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminWorkersPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [notification, setNotification] = useState(null);

  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      service: 'Plumber',
      experience: '5 Years',
      rating: 4.8,
      jobs: 120,
      status: 'Verified',
      phone: '9876543210',
      location: 'Delhi',
      skills: ['Pipe Repair', 'Installation', 'Maintenance'],
      about: 'Experienced plumber with expertise in residential and commercial plumbing.'
    },
    {
      id: 2,
      name: 'Amit Sharma',
      service: 'Electrician',
      experience: '4 Years',
      rating: 4.6,
      jobs: 85,
      status: 'Pending',
      phone: '9876543211',
      location: 'Mumbai',
      skills: ['Wiring', 'Panel Installation', 'Maintenance'],
      about: 'Certified electrician specializing in residential electrical work.'
    },
    {
      id: 3,
      name: 'Suresh Kumar',
      service: 'Carpenter',
      experience: '6 Years',
      rating: 4.7,
      jobs: 150,
      status: 'Verified',
      phone: '9876543212',
      location: 'Bangalore',
      skills: ['Furniture Making', 'Repair', 'Installation'],
      about: 'Skilled carpenter with experience in custom furniture and repairs.'
    },
    {
      id: 4,
      name: 'Priya Singh',
      service: 'Cleaner',
      experience: '3 Years',
      rating: 4.5,
      jobs: 70,
      status: 'Suspended',
      phone: '9876543213',
      location: 'Chennai',
      skills: ['Deep Cleaning', 'Office Cleaning', 'Residential Cleaning'],
      about: 'Professional cleaner with attention to detail.'
    },
    {
      id: 5,
      name: 'Vikram Patel',
      service: 'Painter',
      experience: '7 Years',
      rating: 4.9,
      jobs: 200,
      status: 'Verified',
      phone: '9876543214',
      location: 'Ahmedabad',
      skills: ['Interior Painting', 'Exterior Painting', 'Wall Textures'],
      about: 'Expert painter with experience in both residential and commercial projects.'
    }
  ]);

  const [newWorker, setNewWorker] = useState({
    name: '',
    phone: '',
    service: '',
    experience: '',
    location: ''
  });

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || worker.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerify = (workerId) => {
    setWorkers(workers.map(worker =>
      worker.id === workerId ? { ...worker, status: 'Verified' } : worker
    ));
    setNotification('✓ Worker verified successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSuspend = () => {
    setWorkers(workers.map(worker =>
      worker.id === selectedWorker.id ? { ...worker, status: 'Suspended' } : worker
    ));
    setShowSuspendModal(false);
    setSelectedWorker(null);
    setNotification('Worker suspended.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddWorker = (e) => {
    e.preventDefault();
    const worker = {
      id: workers.length + 1,
      ...newWorker,
      rating: 0,
      jobs: 0,
      status: 'Pending',
      skills: [],
      about: ''
    };
    setWorkers([...workers, worker]);
    setNewWorker({ name: '', phone: '', service: '', experience: '', location: '' });
    setShowAddModal(false);
    setNotification('✓ Worker added successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const showNotification = notification && (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {notification}
    </div>
  );

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

          {/* Notification */}
          {showNotification}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Worker Management
            </h1>
            <p className="text-gray-600 text-lg">
              View and manage workers registered with the cooperative.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search workers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                {['All', 'Verified', 'Pending', 'Suspended'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === status
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-accent-green hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                + Add Worker
              </button>
            </div>
          </div>

          {/* Worker Table - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Worker</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Experience</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jobs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verification</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredWorkers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">{worker.name}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{worker.service}</td>
                    <td className="px-6 py-4 text-gray-600">{worker.experience}</td>
                    <td className="px-6 py-4 text-gray-600">{worker.rating} ★</td>
                    <td className="px-6 py-4 text-gray-600">{worker.jobs}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(worker.status)}`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSelectedWorker(worker); setShowDetailsModal(true); }}
                          className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
                        >
                          View
                        </button>
                        {worker.status === 'Pending' && (
                          <button
                            onClick={() => handleVerify(worker.id)}
                            className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-lg hover:bg-accent-green/20 transition-colors text-sm font-medium"
                          >
                            Verify
                          </button>
                        )}
                        {worker.status === 'Verified' && (
                          <button
                            onClick={() => { setSelectedWorker(worker); setShowSuspendModal(true); }}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Worker Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {filteredWorkers.map((worker) => (
              <div key={worker.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-primary text-lg">{worker.name}</h3>
                    <p className="text-gray-600 text-sm">{worker.service}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(worker.status)}`}>
                    {worker.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs">Experience</p>
                    <p className="text-gray-800 font-medium">{worker.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Rating</p>
                    <p className="text-gray-800 font-medium">{worker.rating} ★</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Jobs</p>
                    <p className="text-gray-800 font-medium">{worker.jobs}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-gray-800 font-medium">{worker.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSelectedWorker(worker); setShowDetailsModal(true); }}
                    className="flex-1 px-3 py-2 bg-accent-blue/10 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
                  >
                    View
                  </button>
                  {worker.status === 'Pending' && (
                    <button
                      onClick={() => handleVerify(worker.id)}
                      className="flex-1 px-3 py-2 bg-accent-green/10 text-accent-green rounded-lg hover:bg-accent-green/20 transition-colors text-sm font-medium"
                    >
                      Verify
                    </button>
                  )}
                  {worker.status === 'Verified' && (
                    <button
                      onClick={() => { setSelectedWorker(worker); setShowSuspendModal(true); }}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add Worker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-6">Add New Worker</h2>
            <form onSubmit={handleAddWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={newWorker.phone}
                  onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  required
                  value={newWorker.service}
                  onChange={(e) => setNewWorker({ ...newWorker, service: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                >
                  <option value="">Select Service</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Driver">Driver</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Gardener">Gardener</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  required
                  value={newWorker.experience}
                  onChange={(e) => setNewWorker({ ...newWorker, experience: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="e.g., 5 Years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={newWorker.location}
                  onChange={(e) => setNewWorker({ ...newWorker, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-government-dark transition-colors"
                >
                  Add Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Worker Details Modal */}
      {showDetailsModal && selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-primary">Worker Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-primary text-lg mb-2">{selectedWorker.name}</h3>
                <p className="text-gray-600">{selectedWorker.service}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="text-gray-800 font-medium">{selectedWorker.experience}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="text-gray-800 font-medium">{selectedWorker.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Rating</p>
                  <p className="text-gray-800 font-medium">{selectedWorker.rating} ★</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed Jobs</p>
                  <p className="text-gray-800 font-medium">{selectedWorker.jobs}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Contact</p>
                  <p className="text-gray-800 font-medium">{selectedWorker.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Verification Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedWorker.status)}`}>
                    {selectedWorker.status}
                  </span>
                </div>
              </div>
              {selectedWorker.skills.length > 0 && (
                <div>
                  <p className="text-gray-500 text-sm mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorker.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedWorker.about && (
                <div>
                  <p className="text-gray-500 text-sm mb-2">About</p>
                  <p className="text-gray-800">{selectedWorker.about}</p>
                </div>
              )}
              {selectedWorker.status === 'Verified' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">✓ Verified by Cooperative</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-government-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Suspend Confirmation Modal */}
      {showSuspendModal && selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-4">Suspend Worker</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to suspend {selectedWorker.name}?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => { setShowSuspendModal(false); setSelectedWorker(null); }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWorkersPage;
