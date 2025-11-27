import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generarPDFGraficas } from '../utils/pdfGenerator'
import ModalValidacion from './ModalValidacion'
import './Checklist.css'

const STORAGE_KEY = 'checklist-graficas-data'

interface ChecklistGraficasData {
  // Información general
  designadoGraficas: string
  fecha: string

  // PC, cuentas, descargas (1-6)
  actividad1_prenderPC: boolean
  actividad2_correo: boolean
  actividad3_perfilTransmision: boolean
  actividad4_whatsappQR: boolean
  actividad5_descargarMaterial: boolean
  actividad6_corroboraMaterial: boolean

  // Presenter (7-12)
  actividad7_abrirPresenter: boolean
  actividad8_seleccionarOrdenCulto: boolean
  actividad9_actualizarFecha: boolean
  actividad10_verificarDiapositivaLogo: boolean
  actividad11_verificarVideos: boolean
  actividad12_verificarVolumen: boolean

  // Alabanzas (13-16)
  actividad13_zonaBloqueAlabanzas: boolean
  actividad14_eliminarAlabanzasAnteriores: boolean
  actividad15_seleccionarCanciones: boolean
  actividad16_arrastrarAlabanzas: boolean

  // Medios (17-18)
  actividad17_aplicarMedios: boolean
  actividad18_importarMedios: boolean

  // Predica (19-22)
  actividad19_abrirPPT: boolean
  actividad20_editarSlice: boolean
  actividad21_editarPPT: boolean
  actividad22_sincronizarDatos: boolean

  // Durante la transmisión (23-27)
  actividad23_reproducirVideoIntro: boolean
  actividad24_bloqueAlabanzas: boolean
  actividad25_seleccionarVersiculo: boolean
  actividad26_seleccionarImagenDoxologia: boolean
  actividad27_reproducirVideoOutro: boolean

  // Para finalizar (28-29)
  actividad28_cerrarProgramas: boolean
  actividad29_limpiarEstacion: boolean

  // Index signature para compatibilidad con pdfGenerator
  [key: string]: any
}

const ChecklistGraficas = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ChecklistGraficasData>({
    designadoGraficas: '',
    fecha: new Date().toISOString().split('T')[0],
    actividad1_prenderPC: false,
    actividad2_correo: false,
    actividad3_perfilTransmision: false,
    actividad4_whatsappQR: false,
    actividad5_descargarMaterial: false,
    actividad6_corroboraMaterial: false,
    actividad7_abrirPresenter: false,
    actividad8_seleccionarOrdenCulto: false,
    actividad9_actualizarFecha: false,
    actividad10_verificarDiapositivaLogo: false,
    actividad11_verificarVideos: false,
    actividad12_verificarVolumen: false,
    actividad13_zonaBloqueAlabanzas: false,
    actividad14_eliminarAlabanzasAnteriores: false,
    actividad15_seleccionarCanciones: false,
    actividad16_arrastrarAlabanzas: false,
    actividad17_aplicarMedios: false,
    actividad18_importarMedios: false,
    actividad19_abrirPPT: false,
    actividad20_editarSlice: false,
    actividad21_editarPPT: false,
    actividad22_sincronizarDatos: false,
    actividad23_reproducirVideoIntro: false,
    actividad24_bloqueAlabanzas: false,
    actividad25_seleccionarVersiculo: false,
    actividad26_seleccionarImagenDoxologia: false,
    actividad27_reproducirVideoOutro: false,
    actividad28_cerrarProgramas: false,
    actividad29_limpiarEstacion: false
  })

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Partial<ChecklistGraficasData>
        setFormData(prev => ({ ...prev, ...parsedData }))
      } catch (error) {
        console.error('Error al cargar datos desde localStorage:', error)
      }
    }
  }, [])

  // Guardar datos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Función para limpiar los datos guardados
  const limpiarDatos = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar todos los datos guardados?')) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.reload()
    }
  }

  const [mostrarModal, setMostrarModal] = useState(false)
  const [actividadesFaltantes, setActividadesFaltantes] = useState<string[]>([])

  const validarActividades = (): string[] => {
    const faltantes: string[] = []

    // PC, cuentas, descargas (1-6)
    if (!formData.actividad1_prenderPC) faltantes.push('1. Prender PC Gráficas')
    if (!formData.actividad2_correo) faltantes.push('2. Introducir correo')
    if (!formData.actividad3_perfilTransmision) faltantes.push('3. Ingresar a perfil de transmisión')
    if (!formData.actividad4_whatsappQR) faltantes.push('4. Conectar WhatsApp mediante código QR')
    if (!formData.actividad5_descargarMaterial) faltantes.push('5. Descargar material enviado')
    if (!formData.actividad6_corroboraMaterial) faltantes.push('6. Abrir carpeta de descargas y corroborar material')

    // Presenter (7-12)
    if (!formData.actividad7_abrirPresenter) faltantes.push('7. Abrir presenter')
    if (!formData.actividad8_seleccionarOrdenCulto) faltantes.push('8. Seleccionar orden del culto')
    if (!formData.actividad9_actualizarFecha) faltantes.push('9. Actualizar fecha del día')
    if (!formData.actividad10_verificarDiapositivaLogo) faltantes.push('10. Verificar diapositiva logo chroma')
    if (!formData.actividad11_verificarVideos) faltantes.push('11. Verificar video introducción y outro')
    if (!formData.actividad12_verificarVolumen) faltantes.push('12. Verificar volumen pc gráficas al 100%')

    // Alabanzas (13-16)
    if (!formData.actividad13_zonaBloqueAlabanzas) faltantes.push('13. Zona bloque 1 y 2 de alabanzas')
    if (!formData.actividad14_eliminarAlabanzasAnteriores) faltantes.push('14. Eliminar alabanzas del culto anterior')
    if (!formData.actividad15_seleccionarCanciones) faltantes.push('15. Seleccionar y abrir canciones')
    if (!formData.actividad16_arrastrarAlabanzas) faltantes.push('16. Arrastrar alabanzas a barra izquierda')

    // Medios (17-18)
    if (!formData.actividad17_aplicarMedios) faltantes.push('17. Aplicar medios en presenter')
    if (!formData.actividad18_importarMedios) faltantes.push('18. Importar medios (avisos y doxología)')

    // Predica (19-22)
    if (!formData.actividad19_abrirPPT) faltantes.push('19. Abrir ppt en carpeta descargas')
    if (!formData.actividad20_editarSlice) faltantes.push('20. Editar slice en presenter')
    if (!formData.actividad21_editarPPT) faltantes.push('21. Editar ppt en pantalla verde')
    if (!formData.actividad22_sincronizarDatos) faltantes.push('22. Sincronizar datos en presenter')

    // Durante la transmisión (23-27)
    if (!formData.actividad23_reproducirVideoIntro) faltantes.push('23. Reproducir video introducción')
    if (!formData.actividad24_bloqueAlabanzas) faltantes.push('24. Bloque 1 y 2 de alabanzas')
    if (!formData.actividad25_seleccionarVersiculo) faltantes.push('25. Seleccionar versículo durante predica')
    if (!formData.actividad26_seleccionarImagenDoxologia) faltantes.push('26. Seleccionar imagen en doxología')
    if (!formData.actividad27_reproducirVideoOutro) faltantes.push('27. Reproducir video outro')

    // Para finalizar (28-29)
    if (!formData.actividad28_cerrarProgramas) faltantes.push('28. Cerrar programas y apagar pc gráficas')
    if (!formData.actividad29_limpiarEstacion) faltantes.push('29. Dejar estación de gráficas limpia')

    return faltantes
  }

  const handleTerminarServicio = () => {
    const faltantes = validarActividades()
    
    if (faltantes.length > 0) {
      setActividadesFaltantes(faltantes)
      setMostrarModal(true)
    } else {
      generarPDFGraficas(formData)
    }
  }

  const handleConfirmarGenerar = () => {
    setMostrarModal(false)
    generarPDFGraficas(formData as ChecklistGraficasData)
  }

  const handleCancelarGenerar = () => {
    setMostrarModal(false)
  }

  return (
    <div className="checklist-container">
      <div className="checklist-card">
        <div className="checklist-header">
          <div className="header-logo-title">
            <img src={`${import.meta.env.BASE_URL}img/icon%20iuc.png`} alt="Logo IUC" className="logo-iuc" />
            <div>
              <h1>CHECKLIST Gráficas Transmisión IUC Viña del Mar Etchevers</h1>
              <div className="header-info">
              <div className="form-group inline">
                <label htmlFor="designadoGraficas">Designado Gráficas:</label>
                <input
                  type="text"
                  id="designadoGraficas"
                  name="designadoGraficas"
                  value={formData.designadoGraficas}
                  onChange={handleChange}
                  className="header-input"
                  required
                />
              </div>
              <div className="form-group inline">
                <label htmlFor="fecha">Fecha:</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="header-input"
                  required
                />
              </div>
            </div>
            </div>
          </div>
          <button className="btn-volver" onClick={() => navigate('/')}>
            ← Volver al Menú
          </button>
        </div>

        <form className="checklist-form">
          {/* PC, cuentas, descargas */}
          <div className="form-section">
            <h2>1. PC, cuentas, descargas</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">1</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad1_prenderPC" checked={formData.actividad1_prenderPC} onChange={handleChange} />
                  <span>Prender PC Gráficas</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">2</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad2_correo" checked={formData.actividad2_correo} onChange={handleChange} />
                  <span>Introducir correo (medios_iuc@gmail.com)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">3</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad3_perfilTransmision" checked={formData.actividad3_perfilTransmision} onChange={handleChange} />
                  <span>Ingresar a perfil de transmisión o unión cristiana</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">4</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad4_whatsappQR" checked={formData.actividad4_whatsappQR} onChange={handleChange} />
                  <span>Conectar WhatsApp mediante código QR en Google</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">5</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad5_descargarMaterial" checked={formData.actividad5_descargarMaterial} onChange={handleChange} />
                  <span>Descargar material enviado a chat transmisiones en WhatsApp</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">6</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad6_corroboraMaterial" checked={formData.actividad6_corroboraMaterial} onChange={handleChange} />
                  <span>Abrir carpeta de descargas y corroborar material del día</span>
                </label>
              </div>
            </div>
          </div>

          {/* Presenter */}
          <div className="form-section">
            <h2>2. Presenter</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">7</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad7_abrirPresenter" checked={formData.actividad7_abrirPresenter} onChange={handleChange} />
                  <span>Abrir presenter (plantilla utilizada recientemente)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">8</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad8_seleccionarOrdenCulto" checked={formData.actividad8_seleccionarOrdenCulto} onChange={handleChange} />
                  <span>Seleccionar barra izquierda con orden del culto del día</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">9</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad9_actualizarFecha" checked={formData.actividad9_actualizarFecha} onChange={handleChange} />
                  <span>Actualizar fecha del día</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">10</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad10_verificarDiapositivaLogo" checked={formData.actividad10_verificarDiapositivaLogo} onChange={handleChange} />
                  <span>Verificar diapositiva logo chroma baja cada nombre de bloque</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">11</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad11_verificarVideos" checked={formData.actividad11_verificarVideos} onChange={handleChange} />
                  <span>Verificar video introducción (10 minutos) y video outro</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">12</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad12_verificarVolumen" checked={formData.actividad12_verificarVolumen} onChange={handleChange} />
                  <span>Verificar volumen pc gráficas al 100%</span>
                </label>
              </div>
            </div>
          </div>

          {/* Alabanzas */}
          <div className="form-section">
            <h2>3. Alabanzas</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">13</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad13_zonaBloqueAlabanzas" checked={formData.actividad13_zonaBloqueAlabanzas} onChange={handleChange} />
                  <span>Zona bloque 1 y 2 de alabanzas</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">14</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad14_eliminarAlabanzasAnteriores" checked={formData.actividad14_eliminarAlabanzasAnteriores} onChange={handleChange} />
                  <span>Eliminar alabanzas del culto anterior</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">15</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad15_seleccionarCanciones" checked={formData.actividad15_seleccionarCanciones} onChange={handleChange} />
                  <span>Seleccionar barra superior derecha y abrir canciones</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">16</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad16_arrastrarAlabanzas" checked={formData.actividad16_arrastrarAlabanzas} onChange={handleChange} />
                  <span>Seleccionar de 1 en 1 por su nombre cada alabanza del día y arrastrar a barra izquierda</span>
                </label>
              </div>
            </div>
          </div>

          {/* Medios */}
          <div className="form-section">
            <h2>4. Medios</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">17</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad17_aplicarMedios" checked={formData.actividad17_aplicarMedios} onChange={handleChange} />
                  <span>Aplicar medios en presenter</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">18</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad18_importarMedios" checked={formData.actividad18_importarMedios} onChange={handleChange} />
                  <span>Importar medios (avisos y doxología)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Predica */}
          <div className="form-section">
            <h2>5. Predica</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">19</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad19_abrirPPT" checked={formData.actividad19_abrirPPT} onChange={handleChange} />
                  <span>Abrir ppt en carpeta descargas</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">20</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad20_editarSlice" checked={formData.actividad20_editarSlice} onChange={handleChange} />
                  <span>Editar slice en presenter</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">21</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad21_editarPPT" checked={formData.actividad21_editarPPT} onChange={handleChange} />
                  <span>Editar ppt en pantalla verde (nombre pastor y titulo culto, tomar versículos de ppt y pegar sin formato en plantilla presenter) (máximo 3 líneas)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">22</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad22_sincronizarDatos" checked={formData.actividad22_sincronizarDatos} onChange={handleChange} />
                  <span>Ahora en presenter sincronizar datos</span>
                </label>
              </div>
            </div>
          </div>

          {/* Durante la transmisión */}
          <div className="form-section en-vivo-section">
            <h2>6. Durante la transmisión</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">23</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad23_reproducirVideoIntro" checked={formData.actividad23_reproducirVideoIntro} onChange={handleChange} />
                  <span>Reproducir video introducción (iniciar 09:50 am)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">24</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad24_bloqueAlabanzas" checked={formData.actividad24_bloqueAlabanzas} onChange={handleChange} />
                  <span>Bloque 1 y 2 de alabanzas (seleccionar alabanza y letra)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">25</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad25_seleccionarVersiculo" checked={formData.actividad25_seleccionarVersiculo} onChange={handleChange} />
                  <span>Durante predica seleccionar diapositiva con versículo que lee el pastor y dejar tiempo prudente (app 10 seg post lectura)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">26</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad26_seleccionarImagenDoxologia" checked={formData.actividad26_seleccionarImagenDoxologia} onChange={handleChange} />
                  <span>En doxología seleccionar imagen en barra izquierda (durante la lectura)</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">27</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad27_reproducirVideoOutro" checked={formData.actividad27_reproducirVideoOutro} onChange={handleChange} />
                  <span>Reproducir video outro bajo orden del director</span>
                </label>
              </div>
            </div>
          </div>

          {/* Para finalizar */}
          <div className="form-section">
            <h2>7. Para finalizar</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">28</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad28_cerrarProgramas" checked={formData.actividad28_cerrarProgramas} onChange={handleChange} />
                  <span>Cerrar programas y apagar pc gráficas</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">29</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad29_limpiarEstacion" checked={formData.actividad29_limpiarEstacion} onChange={handleChange} />
                  <span>Dejar estación de gráficas limpia y organizada</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-imprimir" onClick={handleTerminarServicio}>
              ✅ Terminar Servicio
            </button>
            <button type="button" className="btn-limpiar" onClick={limpiarDatos} title="Limpiar datos guardados">
              🗑️ Limpiar Datos
            </button>
          </div>
        </form>
      </div>
      
      {mostrarModal && (
        <ModalValidacion
          actividadesFaltantes={actividadesFaltantes}
          onConfirmar={handleConfirmarGenerar}
          onCancelar={handleCancelarGenerar}
        />
      )}
    </div>
  )
}

export default ChecklistGraficas
