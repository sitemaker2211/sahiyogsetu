import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WorkerRegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    experience: '',
    location: '',
    availableServices: [],
    about: '',
    agreeGuidelines: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      availableServices: prev.availableServices.includes(service)
        ? prev.availableServices.filter(s => s !== service)
        : [...prev.availableServices, service]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.service || !formData.experience || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.availableServices.length === 0) {
      setError('Please select at least one available service');
      return;
    }

    if (!formData.agreeGuidelines) {
      setError('Please agree to the SahyogSetu worker guidelines');
      return;
    }

    // Demo registration
    setSuccess('Worker profile created successfully!');
    
    setTimeout(() => {
      navigate('/worker-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👷</span>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Join SahyogSetu as a Worker</h1>
            <p className="text-gray-600">Connect with local customers and find more service opportunities.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
              <button
                onClick={() => navigate('/worker-dashboard')}
                className="block mt-4 text-accent-blue hover:text-accent-green font-semibold"
              >
                Go to Worker Dashboard →
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="Rajesh Kumar"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="rajesh@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Service / Profession *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
              >
                <option value="">Select your primary service</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="5"
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
                placeholder="Vellore, Tamil Nadu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Services *</label>
              <div className="grid grid-cols-2 gap-2">
                {services.map(service => (
                  <label key={service} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availableServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-4 h-4 text-accent-blue border-gray-300 rounded focus:ring-accent-blue mr-2"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Yourself</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                placeholder="Tell us about your skills and experience..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeGuidelines"
                checked={formData.agreeGuidelines}
                onChange={handleChange}
                className="w-4 h-4 text-accent-blue border-gray-300 rounded focus:ring-accent-blue"
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree to the SahyogSetu worker guidelines
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-accent-green hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors border-2 border-accent-green hover:border-green-700"
            >
              Create Worker Profile
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have a worker account?{' '}
              <button
                onClick={() => navigate('/worker-dashboard')}
                className="text-accent-blue hover:text-accent-green font-semibold transition-colors"
              >
                Login as Worker
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerRegisterPage;
