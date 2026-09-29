import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      {/* Tricolor stripe - Government of India style */}
      <div className="h-1 bg-gradient-to-r from-accent-saffron via-white to-accent-green"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-accent-saffron rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SahyogSetu</h1>
                <p className="text-xs text-gray-300">Government Initiative</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isLandingPage && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                <a href="#home" className="hover:bg-accent-blue px-4 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-accent-blue/30">Home</a>
                <a href="#services" className="hover:bg-accent-blue px-4 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-accent-blue/30">Services</a>
                <a href="#how-it-works" className="hover:bg-accent-blue px-4 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-accent-blue/30">How It Works</a>
                <a href="#for-workers" className="hover:bg-accent-blue px-4 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-accent-blue/30">For Workers</a>
                <a href="#about" className="hover:bg-accent-blue px-4 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-accent-blue/30">About</a>
              </div>
            </div>
          )}

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              {isLandingPage ? (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-white hover:text-accent-gold px-3 py-2 text-sm font-medium transition-colors border border-white/30 rounded hover:border-accent-gold"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="bg-accent-green hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-accent-green/50"
                  >
                    Register
                  </button>
                  <button 
                    onClick={() => navigate('/admin-login')}
                    className="text-white hover:text-accent-gold px-3 py-2 text-sm font-medium transition-colors border border-white/30 rounded hover:border-accent-gold"
                  >
                    Admin
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/')}
                  className="text-white hover:text-accent-gold px-3 py-2 text-sm font-medium transition-colors border border-white/30 rounded hover:border-accent-gold"
                >
                  Back to Home
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-accent-blue focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLandingPage ? (
              <>
                <a href="#home" className="hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="#services" className="hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium">Services</a>
                <a href="#how-it-works" className="hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium">How It Works</a>
                <a href="#for-workers" className="hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium">For Workers</a>
                <a href="#about" className="hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium">About</a>
                <div className="border-t border-accent-blue mt-2 pt-2">
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full text-left hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="w-full text-left bg-accent-green hover:bg-green-700 block px-3 py-2 rounded-md text-base font-medium mt-1"
                  >
                    Register
                  </button>
                  <button 
                    onClick={() => navigate('/admin-login')}
                    className="w-full text-left hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium mt-1 text-accent-blue"
                  >
                    Admin
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => navigate('/')}
                className="w-full text-left hover:bg-accent-blue block px-3 py-2 rounded-md text-base font-medium"
              >
                Back to Home
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
