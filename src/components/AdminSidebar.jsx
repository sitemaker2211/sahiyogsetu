import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin-dashboard' },
    { name: 'Workers', icon: '👷', path: '/admin-workers' },
    { name: 'Bookings', icon: '📋', path: '/admin-bookings' },
    { name: 'Customers', icon: '👤', path: '/admin-customers' },
    { name: 'Reports', icon: '📈', path: '/admin-reports' },
    { name: 'Settings', icon: '⚙️', path: '/admin-settings' },
    { name: 'Logout', icon: '🚪', path: '/' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary">SahyogSetu</h2>
            <p className="text-sm text-gray-600">Cooperative Portal</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.path)
                    ? 'bg-accent-blue/10 text-accent-blue border-2 border-accent-blue/30'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2026 SahyogSetu
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
