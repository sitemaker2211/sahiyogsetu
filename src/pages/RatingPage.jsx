import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RatingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || null;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const feedbackCategories = [
    'Service Quality',
    'Professionalism',
    'Punctuality'
  ];

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  const handleStarHover = (starNumber) => {
    setHoverRating(starNumber);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    // Update booking with rating
    const existingBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
    const updatedBookings = existingBookings.map(b => 
      b.id === booking.id ? { ...b, rating, feedback, feedbackCategories: selectedCategories } : b
    );
    localStorage.setItem('customerBookings', JSON.stringify(updatedBookings));

    setShowSuccess(true);
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

        {!showSuccess && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Rate Your Experience</h1>
              <p className="text-gray-600 text-lg">
                How was your experience with {booking.worker}?
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 mb-8">
              {/* Star Rating */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="text-5xl mx-2 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <span
                        className={
                          star <= (hoverRating || rating)
                            ? 'text-accent-gold'
                            : 'text-gray-300'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xl font-semibold text-primary">
                  {rating > 0 ? `${rating}/5` : 'Select a rating'}
                </p>
              </div>

              {/* Feedback Textarea */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about your experience...
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                  placeholder="Share your experience with this worker..."
                />
              </div>

              {/* Feedback Categories */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What did you like? (Optional)
                </label>
                <div className="flex flex-wrap gap-3">
                  {feedbackCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-accent-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-accent-green hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Submit Review
              </button>
            </div>
          </>
        )}

        {/* Success Screen */}
        {showSuccess && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
            <div className="w-24 h-24 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Thank you for your feedback!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Your review helps us maintain a trusted local service community.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium text-primary">
                    {'★'.repeat(rating)} {rating}/5
                  </span>
                </div>
                {feedback && (
                  <div>
                    <span className="text-gray-600">Feedback:</span>
                    <p className="font-medium text-primary mt-1">{feedback}</p>
                  </div>
                )}
                {selectedCategories.length > 0 && (
                  <div>
                    <span className="text-gray-600">Categories:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCategories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary hover:bg-government-dark text-white py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingPage;
