import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import { loadTasks, saveTasks } from './utils/storage'
import './App.css'

const bottomNavItems = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Tasks', path: '/tasks', icon: '✓' },
  { label: 'Profile', path: '/profile', icon: '◉' },
]

function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch((error) => {
        console.error('Service worker registration failed:', error)
      })
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar onInstallClick={handleInstallClick} installAvailable={Boolean(deferredPrompt)} />

        <div className="main-panel">
          <header className="topbar">
            <div>
              <p className="eyebrow">TaskMate</p>
              <h2>Student Workspace</h2>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleInstallClick}>
              {deferredPrompt ? 'Install App' : 'PWA Ready'}
            </button>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard tasks={tasks} />} />
            <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        <nav className="bottom-nav" aria-label="Bottom navigation">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </BrowserRouter>
  )
}

export default App
