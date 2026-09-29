import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminBookingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [bookings, setBookings] = useState([
    {
      id: 'SB1024',
      customer: 'Ankit Sharma',
      worker: 'Rajesh Kumar',
      service: 'Plumbing',
      date: '30 Sept 2026',
      time: '4:00 PM',
      amount: '₹400',
      status: 'Completed',
      location: 'Delhi, Sector 15'
    },
    {
      id: 'SB1025',
      customer: 'Priya Sharma',
      worker: 'Amit Kumar',
      service: 'Electrical',
      date: '1 Oct 2026',
      time: '11:00 AM',
      amount: '₹500',
      status: 'Active',
      location: 'Mumbai, Andheri West'
    },
    {
      id: 'SB1026',
      customer: 'Rahul Verma',
      worker: 'Suresh Kumar',
      service: 'Carpentry',
      date: '2 Oct 2026',
      time: '2:00 PM',
      amount: '₹600',
      status: 'Pending',
      location: 'Bangalore, Indiranagar'
    },
    {
      id: 'SB1027',
      customer: 'Neha Gupta',
      worker: 'Vikram Patel',
      service: 'Painting',
      date: '3 Oct 2026',
      time: '10:00 AM',
      amount: '₹800',
      status: 'Active',
      location: 'Ahmedabad, Navrangpura'
    },
    {
      id: 'SB1028',
      customer: 'Amit Singh',
      worker: 'Rajesh Kumar',
      service: 'Plumbing',
      date: '4 Oct 2026',
      time: '3:00 PM',
      amount: '₹350',
      status: 'Cancelled',
      location: 'Delhi, Connaught Place'
    }
  ]);

  const bookingStats = {
    total: bookings.length,
    active: bookings.filter(b => b.status === 'Active').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Active': return 2;
      case 'Completed': return 4;
      default: return 0;
    }
  };

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
              Booking Management
            </h1>
            <p className="text-gray-600 text-lg">
              View and manage all service bookings.
            </p>
          </div>

          {/* Booking Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="text-3xl font-bold text-primary mb-2">{bookingStats.total}</div>
              <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="text-3xl font-bold text-accent-blue mb-2">{bookingStats.active}</div>
              <p className="text-gray-600 text-sm font-medium">Active</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="text-3xl font-bold text-accent-green mb-2">{bookingStats.completed}</div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="text-3xl font-bold text-red-600 mb-2">{bookingStats.cancelled}</div>
              <p className="text-gray-600 text-sm font-medium">Cancelled</p>
            </div>
          </div>

          {/* Booking Table - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Booking ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Worker</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary">{booking.id}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.customer}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.worker}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.service}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                    <td className="px-6 py-4 text-gray-600">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => { setSelectedBooking(booking); setShowDetailsModal(true); }}
                        className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Booking Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{booking.id}</p>
                    <h3 className="font-semibold text-primary">{booking.service}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Customer</span>
                    <span className="text-gray-800 text-sm font-medium">{booking.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Worker</span>
                    <span className="text-gray-800 text-sm font-medium">{booking.worker}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Date</span>
                    <span className="text-gray-800 text-sm font-medium">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Amount</span>
                    <span className="text-gray-800 text-sm font-medium">{booking.amount}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedBooking(booking); setShowDetailsModal(true); }}
                  className="w-full px-3 py-2 bg-accent-blue/10 text-accent-blue rounded-lg hover:bg-accent-blue/20 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-primary">Booking Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
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
                  <p className="text-gray-500 text-sm">Customer</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Worker</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.worker}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Service</p>
                  <p className="text-gray-800 font-medium">{selectedBooking.service}</p>
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
                  <p className="text-gray-800 font-medium">{selectedBooking.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              {/* Booking Timeline */}
              <div className="mt-6">
                <p className="text-gray-500 text-sm mb-4">Booking Timeline</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getStatusStep(selectedBooking.status) >= 1 ? 'bg-accent-green' : 'bg-gray-300'}`}></div>
                    <div className="ml-4">
                      <p className="text-gray-800 font-medium">Request Created</p>
                      <p className="text-gray-500 text-xs">Booking initiated by customer</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getStatusStep(selectedBooking.status) >= 2 ? 'bg-accent-green' : 'bg-gray-300'}`}></div>
                    <div className="ml-4">
                      <p className="text-gray-800 font-medium">Worker Assigned</p>
                      <p className="text-gray-500 text-xs">{selectedBooking.worker} assigned to the job</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getStatusStep(selectedBooking.status) >= 3 ? 'bg-accent-green' : 'bg-gray-300'}`}></div>
                    <div className="ml-4">
                      <p className="text-gray-800 font-medium">Service Started</p>
                      <p className="text-gray-500 text-xs">Worker began the service</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getStatusStep(selectedBooking.status) >= 4 ? 'bg-accent-green' : 'bg-gray-300'}`}></div>
                    <div className="ml-4">
                      <p className="text-gray-800 font-medium">Service Completed</p>
                      <p className="text-gray-500 text-xs">Service finished successfully</p>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default AdminBookingsPage;
