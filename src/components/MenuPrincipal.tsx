import { useNavigate } from 'react-router-dom'
import './MenuPrincipal.css'

const MenuPrincipal = () => {
  const navigate = useNavigate()

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h1 className="menu-title">Checklist de Transmisiones</h1>
        <p className="menu-subtitle">Seleccione el tipo de checklist a realizar</p>
        
        <div className="menu-buttons">
          <button 
            className="menu-button director"
            onClick={() => navigate('/director')}
          >
            <div className="button-icon">📺</div>
            <div className="button-content">
              <h2>Checklist de Director</h2>
              <p>Checklist para el director de transmisión</p>
            </div>
          </button>
          
          <button 
            className="menu-button graficas"
            onClick={() => navigate('/graficas')}
          >
            <div className="button-icon">🎨</div>
            <div className="button-content">
              <h2>Checklist de Gráficas</h2>
              <p>Checklist para gráficas de transmisión</p>
            </div>
          </button>

          <button 
            className="menu-button camaras"
            onClick={() => navigate('/camaras')}
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
  )
}

export default MenuPrincipal

