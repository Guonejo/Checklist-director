import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generarPDFCamaras } from '../utils/pdfGenerator'
import ModalValidacion from './ModalValidacion'
import ModalConfirmacion from './ModalConfirmacion'
import './Checklist.css'

const STORAGE_KEY = 'checklist-camaras-data'

interface ChecklistCamarasData {
  // Información general
  operador: string
  fecha: string
  version: string

  // Actividad 1: Ubicar maleta de cámara
  actividad1_camara1: boolean
  actividad1_camara2: boolean
  actividad1_camara3: boolean

  // Actividad 2: Ubicar trípode
  actividad2_tripode1: boolean
  actividad2_tripode2: boolean
  actividad2_tripode3: boolean

  // Actividad 3: Ubicar intercomunicador
  actividad3_cajaConexiones: boolean
  actividad3_audifono: boolean

  // Actividad 4: Instalar trípode
  actividad4_instalarTripode: boolean

  // Actividad 5: Montar cámara
  actividad5_instalarCamara: boolean
  actividad5_conectarPoder: boolean
  actividad5_conectarHDMI: boolean

  // Actividad 6: Conectar intercomunicador
  actividad6_cable4puntos: boolean
  actividad6_cable3puntosHembra: boolean
  actividad6_cable3puntosMacho: boolean
  actividad6_probarComunicacion: boolean

  // Actividad 7: Encender focos
  actividad7_focosFrontalesContras: boolean
  actividad7_focoDerecho: boolean
  actividad7_focoIzquierdo: boolean

  // Actividad 8: Configurar cámara
  actividad8_destaparLente: boolean
  actividad8_encenderCamara: boolean
  actividad8_ajustarHorizonte: boolean
  // Configuraciones de cámaras
  actividad8_camara1_diafragma: string
  actividad8_camara1_tempColor: string
  actividad8_camara1_exposicion: string
  actividad8_camara1_ganancia: string
  actividad8_camara1_velObturador: string
  actividad8_camara2_diafragma: string
  actividad8_camara2_tempColor: string
  actividad8_camara2_exposicion: string
  actividad8_camara2_ganancia: string
  actividad8_camara2_velObturador: string
  actividad8_camara3_diafragma: string
  actividad8_camara3_tempColor: string
  actividad8_camara3_exposicion: string
  actividad8_camara3_ganancia: string
  actividad8_camara3_velObturador: string

  // Actividad 9: Apagar micrófono
  actividad9_apagarMicrofono: boolean

  // Actividad 10: Desmontar cámara
  actividad10_apagarCamara: boolean
  actividad10_cerrarLente: boolean
  actividad10_guardarCamara: boolean
  actividad10_guardarPoder: boolean
  actividad10_guardarHDMI: boolean

  // Actividad 11: Desarmar trípode
  actividad11_desarmarTripode: boolean

  // Actividad 12: Desconectar intercomunicador
  actividad12_desconectarIntercom: boolean

  // Actividad 13: Guardar en sala
  actividad13_guardarMaleta: boolean
  actividad13_guardarTripode: boolean
  actividad13_guardarIntercom: boolean

  // Actividad 14: Enviar checklist
  actividad14_enviarChecklist: boolean

  // Observaciones
  observaciones: string

  // Index signature para compatibilidad con pdfGenerator
  [key: string]: any
}

const ChecklistCamaras = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ChecklistCamarasData>({
    operador: '',
    fecha: new Date().toISOString().split('T')[0],
    version: '1.0',
    actividad1_camara1: false,
    actividad1_camara2: false,
    actividad1_camara3: false,
    actividad2_tripode1: false,
    actividad2_tripode2: false,
    actividad2_tripode3: false,
    actividad3_cajaConexiones: false,
    actividad3_audifono: false,
    actividad4_instalarTripode: false,
    actividad5_instalarCamara: false,
    actividad5_conectarPoder: false,
    actividad5_conectarHDMI: false,
    actividad6_cable4puntos: false,
    actividad6_cable3puntosHembra: false,
    actividad6_cable3puntosMacho: false,
    actividad6_probarComunicacion: false,
    actividad7_focosFrontalesContras: false,
    actividad7_focoDerecho: false,
    actividad7_focoIzquierdo: false,
    actividad8_destaparLente: false,
    actividad8_encenderCamara: false,
    actividad8_ajustarHorizonte: false,
    actividad8_camara1_diafragma: '',
    actividad8_camara1_tempColor: '',
    actividad8_camara1_exposicion: '',
    actividad8_camara1_ganancia: '',
    actividad8_camara1_velObturador: '',
    actividad8_camara2_diafragma: '',
    actividad8_camara2_tempColor: '',
    actividad8_camara2_exposicion: '',
    actividad8_camara2_ganancia: '',
    actividad8_camara2_velObturador: '',
    actividad8_camara3_diafragma: '',
    actividad8_camara3_tempColor: '',
    actividad8_camara3_exposicion: '',
    actividad8_camara3_ganancia: '',
    actividad8_camara3_velObturador: '',
    actividad9_apagarMicrofono: false,
    actividad10_apagarCamara: false,
    actividad10_cerrarLente: false,
    actividad10_guardarCamara: false,
    actividad10_guardarPoder: false,
    actividad10_guardarHDMI: false,
    actividad11_desarmarTripode: false,
    actividad12_desconectarIntercom: false,
    actividad13_guardarMaleta: false,
    actividad13_guardarTripode: false,
    actividad13_guardarIntercom: false,
    actividad14_enviarChecklist: false,
    observaciones: ''
  })

  // Función para limpiar caracteres extraños del texto
  const limpiarTexto = (texto: string): string => {
    if (!texto || typeof texto !== 'string') return texto
    let limpio = texto.replace(/[\uFEFF\u200B-\u200D\u2060]/g, '')
    limpio = limpio.replace(/[Ø=ÜÝ\u00D8\u00DC\u00DD\u00D6\u00C4\u00C5\u00C6\u00E6\u00C7\u00E7]/g, '')
    limpio = limpio.replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF\u00A0-\u00FF\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00DC\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00FC.,;:!?()\-_]/g, '')
    return limpio.trim()
  }

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Partial<ChecklistCamarasData>
        if (parsedData.observaciones) {
          parsedData.observaciones = limpiarTexto(parsedData.observaciones)
        }
        if (parsedData.operador) {
          parsedData.operador = limpiarTexto(parsedData.operador)
        }
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
      if (name === 'observaciones' || name === 'operador') {
        const valorLimpio = limpiarTexto(value)
        setFormData(prev => ({ ...prev, [name]: valorLimpio }))
      } else {
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    }
  }

  const [mostrarModal, setMostrarModal] = useState(false)
  const [actividadesFaltantes, setActividadesFaltantes] = useState<string[]>([])
  const [mostrarModalLimpiar, setMostrarModalLimpiar] = useState(false)

  const limpiarDatos = () => {
    setMostrarModalLimpiar(true)
  }

  const handleConfirmarLimpiar = () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  const handleCancelarLimpiar = () => {
    setMostrarModalLimpiar(false)
  }

  const validarActividades = (): string[] => {
    const faltantes: string[] = []

    if (!formData.operador || formData.operador.trim() === '') {
      faltantes.push('OPERADOR: Campo obligatorio')
    }

    const actividad1Completa = formData.actividad1_camara1 || formData.actividad1_camara2 || formData.actividad1_camara3
    if (!actividad1Completa) faltantes.push('1. Ubicar maleta de cámara a operar')

    const actividad2Completa = formData.actividad2_tripode1 || formData.actividad2_tripode2 || formData.actividad2_tripode3
    if (!actividad2Completa) faltantes.push('2. Ubicar trípode de cámara a operar')

    const actividad3Completa = formData.actividad3_cajaConexiones || formData.actividad3_audifono
    if (!actividad3Completa) faltantes.push('3. Ubicar intercomunicador')

    if (!formData.actividad4_instalarTripode) faltantes.push('4. Instalar trípode')

    const actividad5Completa = formData.actividad5_instalarCamara || formData.actividad5_conectarPoder || formData.actividad5_conectarHDMI
    if (!actividad5Completa) faltantes.push('5. Montar cámara')

    const actividad6Completa = formData.actividad6_cable4puntos || formData.actividad6_cable3puntosHembra || formData.actividad6_cable3puntosMacho || formData.actividad6_probarComunicacion
    if (!actividad6Completa) faltantes.push('6. Conectar intercomunicador')

    const actividad7Completa = formData.actividad7_focosFrontalesContras || formData.actividad7_focoDerecho || formData.actividad7_focoIzquierdo
    if (!actividad7Completa) faltantes.push('7. Encender focos de salón')

    const actividad8Completa = formData.actividad8_destaparLente || formData.actividad8_encenderCamara || formData.actividad8_ajustarHorizonte
    if (!actividad8Completa) faltantes.push('8. Configurar cámara')

    if (!formData.actividad9_apagarMicrofono) faltantes.push('9. Apagar micrófono de intercomunicador')

    const actividad10Completa = formData.actividad10_apagarCamara || formData.actividad10_cerrarLente || formData.actividad10_guardarCamara || formData.actividad10_guardarPoder || formData.actividad10_guardarHDMI
    if (!actividad10Completa) faltantes.push('10. Desmontar cámara')

    if (!formData.actividad11_desarmarTripode) faltantes.push('11. Desarmar trípode')

    if (!formData.actividad12_desconectarIntercom) faltantes.push('12. Desconectar intercomunicador')

    const actividad13Completa = formData.actividad13_guardarMaleta || formData.actividad13_guardarTripode || formData.actividad13_guardarIntercom
    if (!actividad13Completa) faltantes.push('13. Guardar en sala transmisión')

    if (!formData.actividad14_enviarChecklist) faltantes.push('14. Enviar CHECKLIST de cámaras')

    return faltantes
  }

  const handleTerminarServicio = () => {
    const faltantes = validarActividades()
    if (faltantes.length > 0) {
      setActividadesFaltantes(faltantes)
      setMostrarModal(true)
    } else {
      generarPDFCamaras(formData)
    }
  }

  const handleConfirmarGenerar = () => {
    setMostrarModal(false)
    generarPDFCamaras(formData)
  }

  const handleCancelarGenerar = () => {
    setMostrarModal(false)
  }

  return (
    <div className="checklist-container">
      <div className="checklist-wrapper">
        <div className="checklist-header">
          <img src={`${import.meta.env.BASE_URL}img/icon%20iuc.png`} alt="Logo IUC" className="logo-iuc" />
          <h1>Checklist de Cámaras</h1>
          <div className="header-info">
            <div className="form-group inline">
              <label>
                Operador <span className="required">*</span>
              </label>
              <input
                type="text"
                name="operador"
                value={formData.operador}
                onChange={handleChange}
                className="header-input"
                required
                placeholder="Nombre del operador"
              />
            </div>
            <div className="form-group inline">
              <label>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="header-input"
                required
                readOnly
              />
            </div>
          </div>
          <button className="btn-volver" onClick={() => navigate('/')}>
            ← Volver al Menú
          </button>
        </div>

        <form className="checklist-form">
          <div className="form-section">
            <h2>1. Ubicar maleta de cámara a operar:</h2>
            <div className="actividad-item">
              <div className="actividad-number">1</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad1_camara1" checked={formData.actividad1_camara1} onChange={handleChange} />
                    <span>Cámara 1 - CANON VIXIA HF G70</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad1_camara2" checked={formData.actividad1_camara2} onChange={handleChange} />
                    <span>Cámara 2 - CANON VIXIA HF G50</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad1_camara3" checked={formData.actividad1_camara3} onChange={handleChange} />
                    <span>Cámara 3 - CANON VIXIA HF G20</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>2. Ubicar trípode de cámara a operar:</h2>
            <div className="actividad-item">
              <div className="actividad-number">2</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_tripode1" checked={formData.actividad2_tripode1} onChange={handleChange} />
                    <span>Trípode Manfrotto 525MVB / Cabezal 501HDV - Para cámara 1</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_tripode2" checked={formData.actividad2_tripode2} onChange={handleChange} />
                    <span>Trípode Manfrotto 525MVB / Cabezal 503HDV - Para cámara 2</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_tripode3" checked={formData.actividad2_tripode3} onChange={handleChange} />
                    <span>Trípode Nest NT-777 - Para cámara 3</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>3. Ubicar intercomunicador:</h2>
            <div className="actividad-item">
              <div className="actividad-number">3</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad3_cajaConexiones" checked={formData.actividad3_cajaConexiones} onChange={handleChange} />
                    <span>Caja de conexiones en maleta</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad3_audifono" checked={formData.actividad3_audifono} onChange={handleChange} />
                    <span>Audífono</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>4. Instalar trípode (extender patas y fijar altura adecuada)</h2>
            <div className="actividad-item">
              <div className="actividad-number">4</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad4_instalarTripode" checked={formData.actividad4_instalarTripode} onChange={handleChange} />
                  <span>Instalar trípode</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>5. Montar cámara:</h2>
            <div className="actividad-item">
              <div className="actividad-number">5</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad5_instalarCamara" checked={formData.actividad5_instalarCamara} onChange={handleChange} />
                    <span>Instalar cámara en trípode (fijar al trípode, tornillo lateral)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad5_conectarPoder" checked={formData.actividad5_conectarPoder} onChange={handleChange} />
                    <span>Conectar fuente de poder</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad5_conectarHDMI" checked={formData.actividad5_conectarHDMI} onChange={handleChange} />
                    <span>Conectar cable mini HDMI macho a HDMI hembra</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>6. Conectar intercomunicador (caja de conexiones):</h2>
            <div className="actividad-item">
              <div className="actividad-number">6</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad6_cable4puntos" checked={formData.actividad6_cable4puntos} onChange={handleChange} />
                    <span>Cable CANON hembra de 4 puntos con audífono</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad6_cable3puntosHembra" checked={formData.actividad6_cable3puntosHembra} onChange={handleChange} />
                    <span>Cable CANON hembra de 3 puntos</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad6_cable3puntosMacho" checked={formData.actividad6_cable3puntosMacho} onChange={handleChange} />
                    <span>Cable CANON macho de 3 puntos (solo cámara 1 y 2)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad6_probarComunicacion" checked={formData.actividad6_probarComunicacion} onChange={handleChange} />
                    <span>Probar comunicación con Director</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>7. Encender focos de salón:</h2>
            <div className="actividad-item">
              <div className="actividad-number">7</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad7_focosFrontalesContras" checked={formData.actividad7_focosFrontalesContras} onChange={handleChange} />
                    <span>Focos frontales y contras (si es operador de cámara 1)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad7_focoDerecho" checked={formData.actividad7_focoDerecho} onChange={handleChange} />
                    <span>Foco derecho (si es operador de cámara 2)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad7_focoIzquierdo" checked={formData.actividad7_focoIzquierdo} onChange={handleChange} />
                    <span>Foco izquierdo (si es operador de cámara 3)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>8. Configurar cámara:</h2>
            <div className="actividad-item">
              <div className="actividad-number">8</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad8_destaparLente" checked={formData.actividad8_destaparLente} onChange={handleChange} />
                    <span>Destapar lente</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad8_encenderCamara" checked={formData.actividad8_encenderCamara} onChange={handleChange} />
                    <span>Encender cámara</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad8_ajustarHorizonte" checked={formData.actividad8_ajustarHorizonte} onChange={handleChange} />
                    <span>Ajustar horizonte (cám.1)</span>
                  </label>
                </div>
                
                <div className="camara-config-section">
                  <h4>Configuraciones de cámaras:</h4>
                  <div className="camara-config-table">
                    <div className="camara-config-header">
                      <div className="config-col">Cámara</div>
                      <div className="config-col">Diafragma</div>
                      <div className="config-col">Temp. Color</div>
                      <div className="config-col">Expos.</div>
                      <div className="config-col">Ganancia</div>
                      <div className="config-col">Vel. Obturador</div>
                    </div>
                    <div className="camara-group">
                      <div className="config-row">
                        <div className="config-col">1 (G70)</div>
                        <div className="config-col" data-label="Diafragma">
                          <input type="text" name="actividad8_camara1_diafragma" value={formData.actividad8_camara1_diafragma} onChange={handleChange} placeholder="f/" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Temp. Color">
                          <input type="text" name="actividad8_camara1_tempColor" value={formData.actividad8_camara1_tempColor} onChange={handleChange} placeholder="kelvin" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Expos.">
                          <input type="text" name="actividad8_camara1_exposicion" value={formData.actividad8_camara1_exposicion} onChange={handleChange} placeholder="expos." className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Ganancia">
                          <input type="text" name="actividad8_camara1_ganancia" value={formData.actividad8_camara1_ganancia} onChange={handleChange} placeholder="(db)" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Vel. Obturador">
                          <input type="text" name="actividad8_camara1_velObturador" value={formData.actividad8_camara1_velObturador} onChange={handleChange} placeholder="/" className="tiny-input" />
                        </div>
                      </div>
                      <div className="config-row">
                        <div className="config-col">2 (G50)</div>
                        <div className="config-col" data-label="Diafragma">
                          <input type="text" name="actividad8_camara2_diafragma" value={formData.actividad8_camara2_diafragma} onChange={handleChange} placeholder="f/" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Temp. Color">
                          <input type="text" name="actividad8_camara2_tempColor" value={formData.actividad8_camara2_tempColor} onChange={handleChange} placeholder="kelvin" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Expos.">
                          <input type="text" name="actividad8_camara2_exposicion" value={formData.actividad8_camara2_exposicion} onChange={handleChange} placeholder="expos." className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Ganancia">
                          <input type="text" name="actividad8_camara2_ganancia" value={formData.actividad8_camara2_ganancia} onChange={handleChange} placeholder="(db)" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Vel. Obturador">
                          <input type="text" name="actividad8_camara2_velObturador" value={formData.actividad8_camara2_velObturador} onChange={handleChange} placeholder="/" className="tiny-input" />
                        </div>
                      </div>
                      <div className="config-row">
                        <div className="config-col">3 (G20)</div>
                        <div className="config-col" data-label="Diafragma">
                          <input type="text" name="actividad8_camara3_diafragma" value={formData.actividad8_camara3_diafragma} onChange={handleChange} placeholder="f/" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Temp. Color">
                          <input type="text" name="actividad8_camara3_tempColor" value={formData.actividad8_camara3_tempColor} onChange={handleChange} placeholder="kelvin" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Expos.">
                          <input type="text" name="actividad8_camara3_exposicion" value={formData.actividad8_camara3_exposicion} onChange={handleChange} placeholder="expos." className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Ganancia">
                          <input type="text" name="actividad8_camara3_ganancia" value={formData.actividad8_camara3_ganancia} onChange={handleChange} placeholder="(db)" className="tiny-input" />
                        </div>
                        <div className="config-col" data-label="Vel. Obturador">
                          <input type="text" name="actividad8_camara3_velObturador" value={formData.actividad8_camara3_velObturador} onChange={handleChange} placeholder="/" className="tiny-input" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>9. Apagar micrófono de intercomunicador mientras se está en transmisión, prestando atención a instrucciones de Director.</h2>
            <div className="actividad-item">
              <div className="actividad-number">9</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad9_apagarMicrofono" checked={formData.actividad9_apagarMicrofono} onChange={handleChange} />
                  <span>Apagar micrófono de intercomunicador</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>10. Desmontar cámara luego que Director indique finalización de transmisión:</h2>
            <div className="actividad-item">
              <div className="actividad-number">10</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad10_apagarCamara" checked={formData.actividad10_apagarCamara} onChange={handleChange} />
                    <span>Apagar cámara</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad10_cerrarLente" checked={formData.actividad10_cerrarLente} onChange={handleChange} />
                    <span>Cerrar lente</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad10_guardarCamara" checked={formData.actividad10_guardarCamara} onChange={handleChange} />
                    <span>Guardar cámara en maleta</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad10_guardarPoder" checked={formData.actividad10_guardarPoder} onChange={handleChange} />
                    <span>Guardar fuente de poder en maleta</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad10_guardarHDMI" checked={formData.actividad10_guardarHDMI} onChange={handleChange} />
                    <span>Guardar cable mini HDMI macho a HDMI hembra en maleta</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>11. Desarmar trípode (guardar en bolso solo en trípode Nest de cámara 3)</h2>
            <div className="actividad-item">
              <div className="actividad-number">11</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad11_desarmarTripode" checked={formData.actividad11_desarmarTripode} onChange={handleChange} />
                  <span>Desarmar trípode</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>12. Desconectar intercomunicador (caja de conexiones) y audífono.</h2>
            <div className="actividad-item">
              <div className="actividad-number">12</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad12_desconectarIntercom" checked={formData.actividad12_desconectarIntercom} onChange={handleChange} />
                  <span>Desconectar intercomunicador y audífono</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>13. Guardar en sala transmisión:</h2>
            <div className="actividad-item">
              <div className="actividad-number">13</div>
              <div className="actividad-content">
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad13_guardarMaleta" checked={formData.actividad13_guardarMaleta} onChange={handleChange} />
                    <span>Maleta de cámara</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad13_guardarTripode" checked={formData.actividad13_guardarTripode} onChange={handleChange} />
                    <span>Trípode</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad13_guardarIntercom" checked={formData.actividad13_guardarIntercom} onChange={handleChange} />
                    <span>Intercomunicador</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>14. Enviar CHECKLIST de cámaras al grupo de WhatsApp de Transmisión IUC</h2>
            <div className="actividad-item">
              <div className="actividad-number">14</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad14_enviarChecklist" checked={formData.actividad14_enviarChecklist} onChange={handleChange} />
                  <span>Enviar CHECKLIST de cámaras al grupo de WhatsApp</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Observaciones, mejoras, problemas:</h2>
            <div className="form-group">
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows={6}
                placeholder="Ingrese observaciones, mejoras o problemas encontrados..."
                className="observaciones-textarea"
              />
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
      
      {mostrarModalLimpiar && (
        <ModalConfirmacion
          titulo="🗑️ Limpiar Datos"
          mensaje="¿Estás seguro de que deseas limpiar todos los datos guardados? Esta acción no se puede deshacer."
          textoConfirmar="Sí, limpiar datos"
          textoCancelar="Cancelar"
          onConfirmar={handleConfirmarLimpiar}
          onCancelar={handleCancelarLimpiar}
        />
      )}
    </div>
  )
}

export default ChecklistCamaras

