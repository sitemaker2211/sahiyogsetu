import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || null;
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [processing, setProcessing] = useState(false);

  const totalAmount = booking ? booking.amount + 20 : 0;

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
      
      // Update booking status
      const existingBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
      const updatedBookings = existingBookings.map(b => 
        b.id === booking.id ? { ...b, paymentStatus: 'Paid', paymentMethod, paymentAmount: totalAmount } : b
      );
      localStorage.setItem('customerBookings', JSON.stringify(updatedBookings));
    }, 2000);
  };

  const handleViewReceipt = () => {
    setShowReceipt(true);
  };

  const handleRateWorker = () => {
    navigate(`/rating/${booking.id}`, { state: { booking } });
  };

  const handlePrintReceipt = () => {
    window.print();
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

        {!showSuccess && !showReceipt && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Complete Your Payment</h1>
              <p className="text-gray-600 text-lg">
                Secure payment for your service
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <p className="text-gray-600">Service</p>
                    <p className="font-medium text-primary">{booking.service}</p>
                  </div>
                  <span className="text-gray-800">₹{booking.amount}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <p className="text-gray-600">Worker</p>
                    <p className="font-medium text-primary">{booking.worker}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="text-gray-800">₹{booking.amount}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="text-gray-800">₹20</span>
                </div>
                
                <div className="flex justify-between items-center py-4 bg-accent-blue/5 rounded-lg px-4">
                  <span className="text-lg font-bold text-primary">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Payment Method</h2>
              
              <div className="space-y-3">
                {['UPI', 'Card', 'Cash'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method
                        ? 'border-accent-blue bg-accent-blue/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-accent-blue"
                    />
                    <span className="ml-3 font-medium text-gray-800">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-accent-green hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
            </button>
          </>
        )}

        {/* Payment Success */}
        {showSuccess && !showReceipt && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
            <div className="w-24 h-24 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Payment Successful!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Your payment has been recorded successfully.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-medium text-primary">{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-medium text-primary">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-primary">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-primary">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleViewReceipt}
                className="flex-1 bg-white text-primary border-2 border-primary hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
              >
                View Receipt
              </button>
              <button
                onClick={handleRateWorker}
                className="flex-1 bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Rate Worker
              </button>
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceipt && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">SahyogSetu Payment Receipt</h2>
                <p className="text-gray-600 text-sm">Official Receipt</p>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-medium text-primary">{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer</span>
                  <span className="font-medium text-primary">Demo Customer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Worker</span>
                  <span className="font-medium text-primary">{booking.worker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium text-primary">{booking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-medium text-primary">₹{booking.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium text-primary">₹20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold text-primary text-lg">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-medium text-accent-green">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-primary">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-primary">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 bg-primary hover:bg-government-dark text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Print Receipt
              </button>
              <button
                onClick={handleRateWorker}
                className="flex-1 bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Rate Worker
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
