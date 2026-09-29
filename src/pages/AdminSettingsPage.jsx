import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminSettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const [settings, setSettings] = useState({
    cooperativeName: 'SahyogSetu Cooperative',
    cooperativeLocation: 'Delhi, India',
    contactNumber: '+91 9876543210',
    email: 'contact@sahyogsetu.gov.in'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setNotification('Settings saved successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const showNotification = notification && (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {notification}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 bg-primary text-white px-4 py-2 rounded-lg"
          >
            ☰ Menu
          </button>

          {/* Notification */}
          {showNotification}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Manage cooperative settings and preferences.
            </p>
          </div>

          {/* Settings Form */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 max-w-2xl">
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cooperative Name
                </label>
                <input
                  type="text"
                  value={settings.cooperativeName}
                  onChange={(e) => setSettings({ ...settings, cooperativeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cooperative Location
                </label>
                <input
                  type="text"
                  value={settings.cooperativeLocation}
                  onChange={(e) => setSettings({ ...settings, cooperativeLocation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={settings.contactNumber}
                  onChange={(e) => setSettings({ ...settings, contactNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-government-dark text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
