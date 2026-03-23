import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MenuPrincipal from './components/MenuPrincipal'
import ChecklistDirector from './components/ChecklistDirector'
import ChecklistGraficas from './components/ChecklistGraficas'
import ChecklistCamaras from './components/ChecklistCamaras'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MenuPrincipal />} />
          <Route path="/director" element={<ChecklistDirector />} />
          <Route path="/graficas" element={<ChecklistGraficas />} />
          <Route path="/camaras" element={<ChecklistCamaras />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <button 
          className="theme-toggle-btn" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </Router>
  )
}

export default App

