import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
    setBookings(storedBookings);
  }, []);

  const services = [
    { icon: '⚡', name: 'Electrician', description: 'Expert electrical repairs and installations' },
    { icon: '🔧', name: 'Plumber', description: 'Professional plumbing solutions for your home' },
    { icon: '🔨', name: 'Carpenter', description: 'Custom woodworking and furniture repairs' },
    { icon: '🎨', name: 'Painter', description: 'Interior and exterior painting services' },
    { icon: '🧹', name: 'Cleaner', description: 'Thorough cleaning for homes and offices' },
    { icon: '🚗', name: 'Driver', description: 'Reliable driving services for your needs' },
    { icon: '❤️', name: 'Caregiver', description: 'Compassionate care for elderly and children' },
    { icon: '🌱', name: 'Gardener', description: 'Expert gardening and lawn maintenance' },
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Plumbing Service',
      worker: 'Rajesh Kumar',
      date: '30 Sept 2026',
      time: '4:00 PM',
      amount: '₹350',
      status: 'Confirmed'
    },
    {
      id: 2,
      service: 'Electrical Repair',
      worker: 'Amit Sharma',
      date: '2 Oct 2026',
      time: '11:00 AM',
      amount: '₹500',
      status: 'Pending'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard', active: true },
    { name: 'Book Service', icon: '📅', path: '/book-service', active: false },
    { name: 'My Bookings', icon: '📋', path: '/my-bookings', active: false },
    { name: 'Payments', icon: '💳', path: '#', active: false, comingSoon: true },
    { name: 'Notifications', icon: '🔔', path: '#', active: false, comingSoon: true },
    { name: 'Profile', icon: '👤', path: '#', active: false, comingSoon: true },
    { name: 'Logout', icon: '🚪', path: '/', active: false },
  ];

  const handleBookService = (serviceName) => {
    navigate('/book-service', { state: { selectedService: serviceName } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
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
            <h2 className="text-xl font-bold text-primary mb-6">Menu</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.comingSoon ? alert('Coming Soon!') : navigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-accent-blue/10 text-accent-blue border-2 border-accent-blue/30' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {item.comingSoon && <span className="ml-auto text-xs text-gray-400">Coming Soon</span>}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <div className="bg-white w-64 h-full p-6" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-primary mb-6">Menu</h2>
              <nav className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.comingSoon) {
                        alert('Coming Soon!');
                      } else {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-accent-blue/10 text-accent-blue border-2 border-accent-blue/30' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    {item.comingSoon && <span className="ml-auto text-xs text-gray-400">Coming Soon</span>}
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
              Welcome to SahyogSetu 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Find trusted local workers for your everyday needs.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Active Bookings</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <span className="text-3xl font-bold text-primary">8</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Completed Services</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-saffron/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-3xl font-bold text-primary">₹3,450</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Total Spent</h3>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">Saved Workers</h3>
            </div>
          </div>

          {/* Find a Service Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">What service do you need?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleBookService(service.name)}
                >
                  <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <button className="w-full bg-primary hover:bg-government-dark text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings Section */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-semibold text-primary text-lg mb-2">{booking.service}</h3>
                      <p className="text-gray-600 text-sm">Worker: {booking.worker}</p>
                      <p className="text-gray-600 text-sm">Date: {booking.date} at {booking.time}</p>
                      <p className="text-gray-600 text-sm">Amount: {booking.amount}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
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

export default CustomerDashboard;
