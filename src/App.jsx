import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import HowItWorks from './components/HowItWorks';
import BenefitCard from './components/BenefitCard';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerDashboard from './pages/CustomerDashboard';
import BookServicePage from './pages/BookServicePage';
import WorkerRegisterPage from './pages/WorkerRegisterPage';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerJobsPage from './pages/WorkerJobsPage';
import WorkerEarningsPage from './pages/WorkerEarningsPage';
import WorkerRatingsPage from './pages/WorkerRatingsPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminWorkersPage from './pages/AdminWorkersPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminCustomersPage from './pages/AdminCustomersPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import BookingTrackingPage from './pages/BookingTrackingPage';
import PaymentPage from './pages/PaymentPage';
import RatingPage from './pages/RatingPage';
import MyBookingsPage from './pages/MyBookingsPage';

function LandingPage() {
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

  const navigate = useNavigate();

  const handleBook = (serviceName) => {
    navigate('/book-service', { state: { selectedService: serviceName } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-primary via-government-dark to-government-medium text-white py-20 md:py-32 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-saffron via-white to-accent-green"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-accent-saffron via-white to-accent-green"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-accent-saffron/20 border border-accent-saffron/50 rounded-full px-4 py-1 mb-4">
                <span className="text-accent-saffron text-sm font-semibold">Government of India Initiative</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Trusted Local Services, Just a Few Clicks Away
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Find verified local workers for your everyday household and community needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => navigate('/book-service')}
                  className="bg-accent-green hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors border-2 border-accent-green shadow-lg"
                >
                  Book a Service
                </button>
                <button 
                  onClick={() => navigate('/worker-register')}
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors border-2 border-white shadow-lg"
                >
                  Join as a Worker
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Verified Workers</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Local Services</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Ratings & Reviews</span>
                </div>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:border-accent-gold/50 transition-colors">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm font-medium">Electrician</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:border-accent-gold/50 transition-colors">
                <div className="text-4xl mb-2">🔧</div>
                <p className="text-sm font-medium">Plumber</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:border-accent-gold/50 transition-colors">
                <div className="text-4xl mb-2">🔨</div>
                <p className="text-sm font-medium">Carpenter</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:border-accent-gold/50 transition-colors">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-sm font-medium">Painter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent-saffron/20 border border-accent-saffron/50 rounded-full px-4 py-1 mb-4">
              <span className="text-accent-saffron text-sm font-semibold">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Services You Can Book</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                name={service.name}
                description={service.description}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent-green/20 border border-accent-green/50 rounded-full px-4 py-1 mb-4">
              <span className="text-accent-green text-sm font-semibold">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Why SahyogSetu */}
      <section id="for-workers" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Why SahyogSetu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              title="For Customers"
              icon="👤"
              benefits={[
                'Verified workers',
                'Easy booking',
                'Transparent pricing',
                'Ratings & reviews'
              ]}
            />
            <BenefitCard
              title="For Workers"
              icon="👷"
              benefits={[
                'More local job opportunities',
                'Better visibility',
                'Digital work history'
              ]}
            />
            <BenefitCard
              title="For Cooperatives"
              icon="🏢"
              benefits={[
                'Better worker management',
                'Centralized worker information',
                'Easier job allocation'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-government-dark to-government-medium text-white relative">
        {/* Tricolor stripes */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-saffron via-white to-accent-green"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-saffron via-white to-accent-green"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block bg-accent-gold/20 border border-accent-gold/50 rounded-full px-4 py-1 mb-4">
              <span className="text-accent-gold text-sm font-semibold">Our Commitment</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Built Around Trust</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
              <span className="text-3xl mb-2">✓</span>
              <p className="text-sm font-medium">Verified Workers</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
              <span className="text-3xl mb-2">📋</span>
              <p className="text-sm font-medium">Service History</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
              <span className="text-3xl mb-2">⭐</span>
              <p className="text-sm font-medium">Ratings & Reviews</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
              <span className="text-3xl mb-2">💰</span>
              <p className="text-sm font-medium">Transparent Pricing</p>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
              <span className="text-3xl mb-2">🧾</span>
              <p className="text-sm font-medium">Digital Receipts</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-accent-blue/20 border border-accent-blue/50 rounded-full px-4 py-1 mb-4">
            <span className="text-accent-blue text-sm font-semibold">About Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">About SahyogSetu</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            SahyogSetu is a digital platform that connects households with verified local workers. 
            Our mission is to make trusted local services accessible to everyone while providing 
            workers with better opportunities and visibility in their communities.
          </p>
          <div className="bg-gradient-to-r from-accent-saffron/10 via-white to-accent-green/10 rounded-xl p-8 max-w-2xl mx-auto border-2 border-accent-blue/20">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-1 bg-accent-saffron mr-2"></div>
              <div className="w-12 h-1 bg-white mr-2"></div>
              <div className="w-12 h-1 bg-accent-green"></div>
            </div>
            <p className="text-primary font-semibold text-lg">
              Part of Smart India Hackathon 2026
            </p>
            <p className="text-gray-600 mt-2">
              Building solutions for a better, more connected India
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/book-service" element={<BookServicePage />} />
      <Route path="/worker-register" element={<WorkerRegisterPage />} />
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      <Route path="/worker-jobs" element={<WorkerJobsPage />} />
      <Route path="/worker-earnings" element={<WorkerEarningsPage />} />
      <Route path="/worker-ratings" element={<WorkerRatingsPage />} />
      <Route path="/worker-profile" element={<WorkerProfilePage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-workers" element={<AdminWorkersPage />} />
      <Route path="/admin-bookings" element={<AdminBookingsPage />} />
      <Route path="/admin-customers" element={<AdminCustomersPage />} />
      <Route path="/admin-reports" element={<AdminReportsPage />} />
      <Route path="/admin-settings" element={<AdminSettingsPage />} />
      <Route path="/booking/:id" element={<BookingTrackingPage />} />
      <Route path="/payment/:id" element={<PaymentPage />} />
      <Route path="/rating/:id" element={<RatingPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
    </Routes>
  );
}

export default App;
