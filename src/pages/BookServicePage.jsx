import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BookServicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedService = location.state?.selectedService || '';

  const [formData, setFormData] = useState({
    service: selectedService,
    requirement: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    urgency: 'Normal',
    additionalNotes: '',
    image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showWorkers, setShowWorkers] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showWorkerProfile, setShowWorkerProfile] = useState(false);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const services = [
    'Electrician',
    'Plumber',
    'Carpenter',
    'Painter',
    'Cleaner',
    'Driver',
    'Caregiver',
    'Gardener'
  ];

  const mockWorkers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      profession: formData.service || 'Plumber',
      verified: true,
      rating: 4.8,
      experience: '5 Years',
      jobsCompleted: 120,
      distance: '2.5 km',
      startingPrice: '₹300',
      about: 'Experienced professional with expertise in residential and commercial plumbing. Known for punctuality and quality work.',
      reviews: [
        { user: 'Priya S.', rating: 5, comment: 'Excellent work, very professional!' },
        { user: 'Amit K.', rating: 4, comment: 'Good service, arrived on time.' }
      ]
    },
    {
      id: 2,
      name: 'Amit Sharma',
      profession: formData.service || 'Plumber',
      verified: true,
      rating: 4.6,
      experience: '4 Years',
      jobsCompleted: 85,
      distance: '3.1 km',
      startingPrice: '₹350',
      about: 'Skilled worker with specialization in emergency repairs and maintenance. Customer satisfaction guaranteed.',
      reviews: [
        { user: 'Sneha M.', rating: 5, comment: 'Quick and efficient service.' },
        { user: 'Rahul P.', rating: 4, comment: 'Reasonable pricing and good work.' }
      ]
    },
    {
      id: 3,
      name: 'Suresh Kumar',
      profession: formData.service || 'Plumber',
      verified: true,
      rating: 4.7,
      experience: '6 Years',
      jobsCompleted: 150,
      distance: '4.2 km',
      startingPrice: '₹280',
      about: 'Veteran in the field with extensive experience in all types of plumbing work. Reliable and trustworthy.',
      reviews: [
        { user: 'Neha G.', rating: 5, comment: 'Very experienced and honest.' },
        { user: 'Vikram S.', rating: 4, comment: 'Did a great job with our bathroom.' }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.service || !formData.requirement || !formData.location || !formData.preferredDate || !formData.preferredTime) {
      setError('Please fill in all required fields');
      return;
    }

    setSuccess('Service request created successfully!');
    setShowWorkers(true);
  };

  const handleViewProfile = (worker) => {
    setSelectedWorker(worker);
    setShowWorkerProfile(true);
  };

  const handleBookNow = (worker) => {
    setSelectedWorker(worker);
    setShowBookingConfirm(true);
  };

  const handleConfirmBooking = () => {
    setShowBookingConfirm(false);
    setBookingConfirmed(true);
  };

  const handleCancelBooking = () => {
    setShowBookingConfirm(false);
  };

  const handleCloseProfile = () => {
    setShowWorkerProfile(false);
    setSelectedWorker(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-accent-blue hover:text-accent-green font-medium mb-4 inline-block"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Book a Service</h1>
          <p className="text-gray-600 text-lg">
            Tell us what you need and we'll help you find a suitable local worker.
          </p>
        </div>

        {!showWorkers && !bookingConfirmed && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Service *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                >
                  <option value="">Choose a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Requirement *</label>
                <textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                  placeholder="Example: My kitchen tap is leaking and needs repair."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                  placeholder="Enter your location"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="Normal"
                      checked={formData.urgency === 'Normal'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent-blue border-gray-300 focus:ring-accent-blue"
                    />
                    <span className="ml-2 text-gray-700">Normal</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="Urgent"
                      checked={formData.urgency === 'Urgent'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent-blue border-gray-300 focus:ring-accent-blue"
                    />
                    <span className="ml-2 text-gray-700">Urgent</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                  placeholder="Any additional information..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image (Optional)</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                />
                {formData.image && (
                  <p className="text-sm text-gray-600 mt-2">Selected: {formData.image.name}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-government-dark text-white py-3 rounded-lg font-semibold transition-colors border-2 border-primary hover:border-government-dark"
              >
                Find Workers
              </button>
            </form>
          </div>
        )}

        {showWorkers && !bookingConfirmed && (
          <div>
            <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-4 mb-6">
              <p className="text-accent-blue font-medium">Finding workers near you...</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-6">Recommended Workers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWorkers.map((worker) => (
                <div key={worker.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-accent-saffron/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">👷</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-lg">{worker.name}</h3>
                      <p className="text-gray-600 text-sm">{worker.profession}</p>
                      {worker.verified && (
                        <span className="inline-block bg-accent-green/10 text-accent-green text-xs px-2 py-1 rounded-full mt-1">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">⭐</span>
                      <span>{worker.rating} Rating</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      <span>{worker.experience} Experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">✅</span>
                      <span>{worker.jobsCompleted} Jobs Completed</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      <span>{worker.distance} away</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">💰</span>
                      <span>Starting from {worker.startingPrice}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewProfile(worker)}
                      className="flex-1 bg-white text-primary border-2 border-primary hover:bg-gray-50 py-2 rounded-lg font-medium transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleBookNow(worker)}
                      className="flex-1 bg-accent-green hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingConfirmed && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Booking Request Sent!</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Worker:</span>
                  <span className="font-medium text-primary">{selectedWorker?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium text-primary">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-accent-green">Pending Confirmation</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary hover:bg-government-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors border-2 border-primary hover:border-government-dark"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Worker Profile Modal */}
        {showWorkerProfile && selectedWorker && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Worker Profile</h2>
                  <button
                    onClick={handleCloseProfile}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-accent-saffron/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">👷</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{selectedWorker.name}</h3>
                    <p className="text-gray-600">{selectedWorker.profession}</p>
                    {selectedWorker.verified && (
                      <span className="inline-block bg-accent-green/10 text-accent-green text-sm px-3 py-1 rounded-full mt-2">
                        ✓ Verified Worker
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorker.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorker.experience}</div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorker.jobsCompleted}</div>
                    <div className="text-sm text-gray-600">Jobs</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{selectedWorker.distance}</div>
                    <div className="text-sm text-gray-600">Distance</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-2">About</h4>
                  <p className="text-gray-600">{selectedWorker.about}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-2">Starting Price</h4>
                  <p className="text-2xl font-bold text-accent-green">{selectedWorker.startingPrice}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">Customer Reviews</h4>
                  <div className="space-y-3">
                    {selectedWorker.reviews.map((review, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-primary">{review.user}</span>
                          <span className="text-accent-gold">{'★'.repeat(review.rating)}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleCloseProfile}
                    className="flex-1 bg-white text-primary border-2 border-primary hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleCloseProfile();
                      handleBookNow(selectedWorker);
                    }}
                    className="flex-1 bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation Modal */}
        {showBookingConfirm && selectedWorker && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Confirm Booking</h2>
              <p className="text-gray-600 mb-6">
                Would you like to book {selectedWorker.name} for {formData.service}?
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Worker:</span>
                    <span className="font-medium text-primary">{selectedWorker.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-primary">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price:</span>
                    <span className="font-medium text-primary">{selectedWorker.startingPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleCancelBooking}
                  className="flex-1 bg-white text-primary border-2 border-primary hover:bg-gray-50 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookServicePage;
