import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WorkerProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [available, setAvailable] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    location: 'Vellore',
    about: 'Experienced professional with expertise in residential and commercial plumbing. Known for punctuality and quality work.'
  });
  const navigate = useNavigate();

  // Mock worker data
  const worker = {
    name: 'Rajesh Kumar',
    profession: 'Plumber',
    location: 'Vellore',
    verified: true,
    rating: 4.8,
    completedJobs: 120,
    experience: 5,
    about: 'Experienced professional with expertise in residential and commercial plumbing. Known for punctuality and quality work.',
    skills: ['Residential Plumbing', 'Commercial Plumbing', 'Emergency Repairs', 'Pipe Installation'],
    serviceArea: ['Vellore', 'Katpadi', 'Gudiyatham', 'Ambur']
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/worker-dashboard', active: false },
    { name: 'Job Requests', icon: '📋', path: '/worker-dashboard', active: false },
    { name: 'My Jobs', icon: '📅', path: '/worker-jobs', active: false },
    { name: 'Earnings', icon: '💰', path: '/worker-earnings', active: false },
    { name: 'Ratings', icon: '⭐', path: '/worker-ratings', active: false },
    { name: 'Availability', icon: '🕐', path: '/worker-dashboard', active: false },
    { name: 'Profile', icon: '👤', path: '/worker-profile', active: true },
    { name: 'Logout', icon: '🚪', path: '/', active: false },
  ];

  const handleEditSave = () => {
    setEditing(false);
    alert('Profile updated successfully!');
  };

  const handleEditCancel = () => {
    setEditing(false);
    setEditForm({
      fullName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@example.com',
      location: 'Vellore',
      about: 'Experienced professional with expertise in residential and commercial plumbing. Known for punctuality and quality work.'
    });
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

          <h1 className="text-3xl font-bold text-primary mb-8">Worker Profile</h1>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex items-start mb-6 md:mb-0">
                <div className="w-24 h-24 bg-accent-saffron/10 rounded-full flex items-center justify-center mr-6">
                  <span className="text-4xl">👷</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-1">{worker.name}</h2>
                  {worker.verified && (
                    <span className="inline-block bg-accent-green/10 text-accent-green text-sm px-3 py-1 rounded-full mb-2">
                      ✓ Verified Worker
                    </span>
                  )}
                  <p className="text-gray-600 mb-1">{worker.profession}</p>
                  <p className="text-gray-500 text-sm mb-2">{worker.location}</p>
                  <div className="flex items-center">
                    <span className="text-accent-gold mr-1">⭐</span>
                    <span className="font-semibold text-primary">{worker.rating}</span>
                    <span className="text-gray-500 ml-2">Rating</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-primary hover:bg-government-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setAvailable(!available)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    available 
                      ? 'bg-accent-green hover:bg-green-700 text-white' 
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                  }`}
                >
                  {available ? 'Available' : 'Unavailable'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{worker.experience} Years</div>
                <div className="text-sm text-gray-600">Experience</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{worker.completedJobs}</div>
                <div className="text-sm text-gray-600">Completed Jobs</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{worker.rating} ★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">Vellore</div>
                <div className="text-sm text-gray-600">Location</div>
              </div>
            </div>

            {/* About */}
            <div className="mb-6">
              <h3 className="font-semibold text-primary mb-2">About</h3>
              <p className="text-gray-600">{worker.about}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="font-semibold text-primary mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill, index) => (
                  <span key={index} className="bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Service Area */}
            <div>
              <h3 className="font-semibold text-primary mb-2">Service Area</h3>
              <div className="flex flex-wrap gap-2">
                {worker.serviceArea.map((area, index) => (
                  <span key={index} className="bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Worker Verification */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Worker Verification</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-accent-green mr-2">✓</span>
                <span className="text-gray-700">Identity Information Submitted</span>
              </div>
              <div className="flex items-center">
                <span className="text-accent-green mr-2">✓</span>
                <span className="text-gray-700">Skills Information Submitted</span>
              </div>
              <div className="flex items-center">
                <span className="text-accent-saffron mr-2">●</span>
                <span className="text-gray-700">Cooperative Verification Pending</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <span className="inline-block bg-accent-green/10 text-accent-green text-sm px-3 py-1 rounded-full mr-2">
                  Verified
                </span>
                <span className="text-gray-600 text-sm">Worker profiles can be verified through the associated cooperative.</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-primary mb-4">Your Availability</h2>
            <div className="flex items-center mb-4">
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
            <div>
              <h3 className="font-semibold text-primary mb-3">Available Days</h3>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <label key={day} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={day !== 'Sunday'}
                      className="w-4 h-4 text-accent-blue border-gray-300 rounded focus:ring-accent-blue mr-2"
                    />
                    <span className="text-xs">{day.slice(0, 3)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                <textarea
                  value={editForm.about}
                  onChange={(e) => setEditForm({...editForm, about: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleEditCancel}
                className="flex-1 bg-white text-primary border-2 border-primary hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="flex-1 bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfilePage;
