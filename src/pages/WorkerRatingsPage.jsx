import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WorkerRatingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: 'Ankit Sharma',
      rating: 5,
      comment: 'Very professional and completed the work quickly. Highly recommended!',
      date: '28 Sept 2026'
    },
    {
      id: 2,
      user: 'Priya S.',
      rating: 5,
      comment: 'Excellent service, arrived on time and fixed the issue perfectly.',
      date: '25 Sept 2026'
    },
    {
      id: 3,
      user: 'Rahul M.',
      rating: 4,
      comment: 'Good work, reasonable pricing. Would use again.',
      date: '20 Sept 2026'
    },
    {
      id: 4,
      user: 'Sneha G.',
      rating: 5,
      comment: 'Very skilled and courteous. Explained the problem clearly.',
      date: '15 Sept 2026'
    },
    {
      id: 5,
      user: 'Vikram S.',
      rating: 4,
      comment: 'Professional and efficient. Minor delay but quality work.',
      date: '10 Sept 2026'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: '📊', path: '/worker-dashboard', active: false },
    { name: 'Job Requests', icon: '📋', path: '/worker-dashboard', active: false },
    { name: 'My Jobs', icon: '📅', path: '/worker-jobs', active: false },
    { name: 'Earnings', icon: '💰', path: '/worker-earnings', active: false },
    { name: 'Ratings', icon: '⭐', path: '/worker-ratings', active: true },
    { name: 'Availability', icon: '🕐', path: '/worker-dashboard', active: false },
    { name: 'Profile', icon: '👤', path: '/worker-profile', active: false },
    { name: 'Logout', icon: '🚪', path: '/', active: false },
  ];

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
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

          <h1 className="text-3xl font-bold text-primary mb-8">Ratings & Reviews</h1>

          {/* Overall Rating */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <span className="text-5xl font-bold text-primary mr-4">4.8</span>
                  <div>
                    <div className="text-accent-gold text-2xl">★★★★★</div>
                    <p className="text-gray-600">Based on 86 reviews</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:ml-8">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center">
                      <span className="w-12 text-sm text-gray-600">{stars} ★</span>
                      <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-accent-gold h-2 rounded-full"
                          style={{
                            width: stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : '2%'
                          }}
                        />
                      </div>
                      <span className="w-12 text-sm text-gray-600 text-right">
                        {stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : '2%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg">👤</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{review.user}</h3>
                          <p className="text-gray-500 text-sm">{review.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-accent-gold text-lg">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkerRatingsPage;
