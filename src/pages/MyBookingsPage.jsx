import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
    setBookings(storedBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') {
      return booking.status !== 'Service Completed' && booking.status !== 'Cancelled';
    }
    if (activeTab === 'Completed') {
      return booking.status === 'Service Completed';
    }
    if (activeTab === 'Cancelled') {
      return booking.status === 'Cancelled';
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Service Completed': return 'bg-green-100 text-green-800';
      case 'Request Submitted': return 'bg-yellow-100 text-yellow-800';
      case 'Worker On The Way': return 'bg-blue-100 text-blue-800';
      case 'Service Started': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTrackBooking = (booking) => {
    navigate(`/booking/${booking.id}`, { state: { booking } });
  };

  const handleRateWorker = (booking) => {
    navigate(`/rating/${booking.id}`, { state: { booking } });
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const tabs = ['All', 'Active', 'Completed', 'Cancelled'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-accent-blue hover:text-accent-green font-medium mb-4 inline-block"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">My Bookings</h1>
          <p className="text-gray-600 text-lg">
            View and manage all your service bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 border border-gray-200 mb-6">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Cards */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'All' 
                ? "You haven't made any bookings yet." 
                : `You don't have any ${activeTab.toLowerCase()} bookings.`}
            </p>
            <button
              onClick={() => navigate('/book-service')}
              className="bg-primary hover:bg-government-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Book a Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{booking.id}</p>
                    <h3 className="font-semibold text-primary text-lg">{booking.service}</h3>
                    <p className="text-gray-600 text-sm">{booking.worker}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🕐</span>
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">💰</span>
                    <span>₹{booking.amount + (booking.paymentStatus ? 20 : 0)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  {booking.status !== 'Service Completed' && booking.status !== 'Cancelled' && (
                    <button
                      onClick={() => handleTrackBooking(booking)}
                      className="flex-1 px-3 py-2 bg-accent-blue/10 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
                    >
                      Track
                    </button>
                  )}
                  {booking.status === 'Service Completed' && !booking.rating && (
                    <button
                      onClick={() => handleRateWorker(booking)}
                      className="flex-1 px-3 py-2 bg-accent-green/10 text-accent-green rounded-lg hover:bg-accent-green/20 transition-colors text-sm font-medium"
                    >
                      Rate
                    </button>
                  )}
                  {booking.rating && (
                    <span className="flex-1 px-3 py-2 bg-accent-gold/10 text-accent-gold rounded-lg text-sm font-medium text-center">
                      {booking.rating} ★
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-primary">Booking Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                <p className="text-lg font-semibold text-primary">{selectedBooking.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Service</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Worker</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.worker}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Date</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Time</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Amount</p>
                  <p className="text-gray-800 font-medium">₹{selectedBooking.amount + (selectedBooking.paymentStatus ? 20 : 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                {selectedBooking.rating && (
                  <div>
                    <p className="text-gray-500 text-sm">Rating</p>
                    <p className="text-gray-800 font-medium">{selectedBooking.rating} ★</p>
                  </div>
                )}
              </div>
              {selectedBooking.paymentStatus && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">✓ Payment Completed</p>
                </div>
              )}
              {selectedBooking.rating && (
                <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-lg p-4">
                  <p className="text-accent-gold font-medium">⭐ Rated {selectedBooking.rating} ★</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-government-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
