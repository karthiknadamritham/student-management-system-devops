import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: 'dashboard' },
    { id: 'students', label: '🎓 Students', icon: 'person' },
    { id: 'courses', label: '📚 Courses', icon: 'book' },
    { id: 'attendance', label: '✅ Attendance', icon: 'check_circle' },
    { id: 'marks', label: '📝 Examination', icon: 'grade' },
  ];

  return (
    <div className="sidebar-glass">
      <div className="sidebar-header">
        <h2>SMS Pro</h2>
        <p>Admin Portal</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>© 2024 SMS DevOps</p>
      </div>
    </div>
  );
};

export default Sidebar;
