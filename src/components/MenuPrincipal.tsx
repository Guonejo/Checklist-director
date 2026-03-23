import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MenuPrincipal.css'

const MenuPrincipal = () => {
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  const handleNavigate = (path: string, text: string) => {
    setLoadingText(text)
    setIsNavigating(true)
    setTimeout(() => {
      navigate(path)
    }, 800)
  }

  return (
    <>
      {isNavigating && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
          <h2 className="loader-text">{loadingText}</h2>
        </div>
      )}
      <div className="menu-container">
      <div className="menu-card">
        <h1 className="menu-title">Checklist de Transmisiones</h1>
        <p className="menu-subtitle">Seleccione el tipo de checklist a realizar</p>
        
        <div className="menu-buttons">
          <button 
            className="menu-button director"
            onClick={() => handleNavigate('/director', 'Cargando Director...')}
          >
            <div className="button-icon">📺</div>
            <div className="button-content">
              <h2>Checklist de Director</h2>
              <p>Checklist para el director de transmisión</p>
            </div>
          </button>
          
          <button 
            className="menu-button graficas"
            onClick={() => handleNavigate('/graficas', 'Cargando Gráficas...')}
          >
            <div className="button-icon">🎨</div>
            <div className="button-content">
              <h2>Checklist de Gráficas</h2>
              <p>Checklist para gráficas de transmisión</p>
            </div>
          </button>

          <button 
            className="menu-button camaras"
            onClick={() => handleNavigate('/camaras', 'Cargando Cámaras...')}
          >
            <div className="button-icon">📷</div>
            <div className="button-content">
              <h2>Checklist de Cámaras</h2>
              <p>Checklist para operadores de cámaras</p>
            </div>
          </button>
        </div>
      </div>
      </div>
    </>
  )
}

export default MenuPrincipal

