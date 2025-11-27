import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MenuPrincipal from './components/MenuPrincipal'
import ChecklistDirector from './components/ChecklistDirector'
import ChecklistGraficas from './components/ChecklistGraficas'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPrincipal />} />
        <Route path="/director" element={<ChecklistDirector />} />
        <Route path="/graficas" element={<ChecklistGraficas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

