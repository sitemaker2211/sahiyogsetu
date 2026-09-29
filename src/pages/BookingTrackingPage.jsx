import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BookingTrackingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || null;
  const [currentStep, setCurrentStep] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const timelineSteps = [
    { id: 0, label: 'Request Submitted', icon: '📝' },
    { id: 1, label: 'Worker Matched', icon: '🔗' },
    { id: 2, label: 'Worker Accepted', icon: '✓' },
    { id: 3, label: 'Worker On The Way', icon: '🚗' },
    { id: 4, label: 'Service Started', icon: '🔧' },
    { id: 5, label: 'Service Completed', icon: '✅' }
  ];

  useEffect(() => {
    if (booking) {
      setCurrentStep(booking.timelineStep || 0);
    }
  }, [booking]);

  const handleNextStatus = () => {
    if (currentStep < timelineSteps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      
      // Update booking in localStorage
      const existingBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
      const updatedBookings = existingBookings.map(b => 
        b.id === booking.id ? { ...b, status: timelineSteps[newStep].label, timelineStep: newStep } : b
      );
      localStorage.setItem('customerBookings', JSON.stringify(updatedBookings));
      
      // Update worker bookings too
      const workerBookings = JSON.parse(localStorage.getItem('workerBookings') || '{}');
      if (workerBookings[booking.workerId]) {
        workerBookings[booking.workerId] = workerBookings[booking.workerId].map(b =>
          b.id === booking.id ? { ...b, status: timelineSteps[newStep].label, timelineStep: newStep } : b
        );
        localStorage.setItem('workerBookings', JSON.stringify(workerBookings));
      }
    }
  };

  const getStatusColor = (step) => {
    if (step < currentStep) return 'bg-accent-green text-white';
    if (step === currentStep) return 'bg-accent-blue text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const getLineColor = (step) => {
    if (step < currentStep) return 'bg-accent-green';
    if (step === currentStep) return 'bg-accent-blue';
    return 'bg-gray-200';
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Booking Not Found</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-accent-blue hover:text-accent-green font-medium mb-4 inline-block"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Track Your Booking</h1>
          <p className="text-gray-600 text-lg">
            Monitor your service request in real-time
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking ID</p>
              <p className="text-xl font-bold text-primary">{booking.id}</p>
            </div>
            <span className="px-4 py-2 bg-accent-blue/10 text-accent-blue rounded-full font-medium">
              {timelineSteps[currentStep].label}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Service</p>
              <p className="font-medium text-primary">{booking.service}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Worker</p>
              <p className="font-medium text-primary">{booking.worker}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Date</p>
              <p className="font-medium text-primary">{booking.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Time</p>
              <p className="font-medium text-primary">{booking.time}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-primary mb-6">Booking Progress</h2>
          
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="flex items-start mb-8 last:mb-0">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getStatusColor(index)}`}>
                    {step.icon}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className={`w-1 h-16 ${getLineColor(index)}`} style={{ minHeight: '4rem' }}></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className={`font-semibold ${index <= currentStep ? 'text-primary' : 'text-gray-400'}`}>
                    {step.label}
                  </h3>
                  {index === currentStep && (
                    <p className="text-sm text-accent-blue mt-1">Current Status</p>
                  )}
                  {index < currentStep && (
                    <p className="text-sm text-accent-green mt-1">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Demo Controls */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              ⚠️ Demo Controls: Click to simulate booking progress
            </p>
            <div className="flex gap-4">
              {currentStep < timelineSteps.length - 1 ? (
                <button
                  onClick={handleNextStatus}
                  className="bg-accent-blue hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Next Status →
                </button>
              ) : (
                <button
                  onClick={() => setShowPayment(true)}
                  className="bg-accent-green hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Service Completed Message */}
        {currentStep === timelineSteps.length - 1 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <span className="text-4xl mr-4">✅</span>
              <div>
                <h3 className="text-xl font-bold text-green-800">Service completed successfully!</h3>
                <p className="text-green-700">Your service has been completed. Please proceed to payment.</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Proceed to Payment</h2>
              <p className="text-gray-600 mb-6">
                Complete your payment for the service provided by {booking.worker}.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-primary">{booking.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Worker:</span>
                    <span className="font-medium text-primary">{booking.worker}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Charge:</span>
                    <span className="font-medium text-primary">₹{booking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee:</span>
                    <span className="font-medium text-primary">₹20</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-primary">Total:</span>
                      <span className="text-primary">₹{booking.amount + 20}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-white text-primary border-2 border-primary hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate(`/payment/${booking.id}`, { state: { booking } })}
                  className="flex-1 bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTrackingPage;
