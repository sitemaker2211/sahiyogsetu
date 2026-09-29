const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      {/* Tricolor stripe */}
      <div className="h-1 bg-gradient-to-r from-accent-saffron via-white to-accent-green"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent-saffron rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">SahyogSetu</h2>
                <p className="text-xs text-gray-300">Government Initiative</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">Trusted Local Services, Connected Digitally</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">Services</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">How It Works</a></li>
              <li><a href="#for-workers" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">For Workers</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">About</a></li>
              <li><a href="/admin-login" className="text-accent-blue hover:text-white transition-colors text-sm">Admin Portal</a></li>
            </ul>
          </div>

          {/* Hackathon Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-accent-gold text-sm font-semibold">Smart India Hackathon 2026</p>
            </div>
            <p className="text-gray-300 text-sm">Connecting communities with trusted local services</p>
            <div className="flex items-center mt-4 space-x-2">
              <div className="w-8 h-1 bg-accent-saffron"></div>
              <div className="w-8 h-1 bg-white"></div>
              <div className="w-8 h-1 bg-accent-green"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2026 SahyogSetu. Government of India Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
