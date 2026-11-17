import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/', icon: '⌂' },
  { label: 'My Tasks', path: '/tasks', icon: '✓' },
  { label: 'Profile', path: '/profile', icon: '◉' },
]

const Sidebar = ({ onInstallClick, installAvailable }) => {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">T</div>
        <div>
          <p className="brand-label">TaskMate</p>
          <small>Student Task Management</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {installAvailable && (
        <button type="button" className="btn btn-primary install-button" onClick={onInstallClick}>
          Install App
        </button>
      )}
    </aside>
  )
}

export default Sidebar
