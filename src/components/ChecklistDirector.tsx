import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generarPDFDirector } from '../utils/pdfGenerator'
import './Checklist.css'

interface ChecklistDirectorData {
  // Información general
  director: string
  fecha: string
  version: string

  // Setup and Pre-Transmission Checks (1-12)
  actividad1_ups: boolean
  actividad2_atem_camara1: boolean
  actividad2_atem_camara2: boolean
  actividad2_atem_camara3: boolean
  actividad2_atem_pcGraficas: boolean
  actividad2_atem_monitorLED: boolean
  actividad2_atem_audio: boolean
  actividad2_atem_rj45: boolean
  actividad2_atem_usb: boolean
  actividad2_atem_power: boolean
  actividad3_luces_frontales: boolean
  actividad3_luces_contras: boolean
  actividad3_luces_laterales: boolean
  actividad4_velocidadInternet: string
  actividad5_transmisionProgramada: boolean
  actividad6_claveYoutube: boolean
  actividad7_nombreGrabacion: boolean
  actividad8_transmisionActivada: boolean
  actividad9_camara1_horiz: boolean
  actividad9_camara1_diafragma: string
  actividad9_camara1_colorTemp: string
  actividad9_camara1_exposicion: string
  actividad9_camara1_ganancia: string
  actividad9_camara1_obtura: string
  actividad9_camara2_horiz: boolean
  actividad9_camara2_diafragma: string
  actividad9_camara2_colorTemp: string
  actividad9_camara2_exposicion: string
  actividad9_camara2_ganancia: string
  actividad9_camara2_obtura: string
  actividad9_camara3_horiz: boolean
  actividad9_camara3_diafragma: string
  actividad9_camara3_colorTemp: string
  actividad9_camara3_exposicion: string
  actividad9_camara3_ganancia: string
  actividad9_camara3_obtura: string
  actividad10_audioCamarasApagado: boolean
  actividad11_intercomunicadores: boolean
  actividad12_monitoresCecilia: boolean

  // Pre-Live Countdown (13-15)
  actividad13_videoMusicaTransmitir: boolean
  actividad14_audioGraficasActivado: boolean
  actividad15_oracion: boolean

  // During Live Transmission (16-22)
  actividad16_audioGraficasApagado: boolean
  actividad16_mic1Encendido: boolean
  actividad17_videoIntroDesactivado: boolean
  actividad18_grabacionActiva: boolean
  actividad19_comentariosYoutube: boolean
  actividad20_audioVideoYoutube: boolean
  actividad21_whatsappGrupo: boolean
  actividad22_intercomDirectorApagado: boolean

  // Post-Transmission (23-30)
  actividad23_transmisionFinalizadaATEM: boolean
  actividad24_transmisionFinalizadaYoutube: boolean
  actividad25_equiposGuardados: boolean
  actividad26_focosApagados_frontales: boolean
  actividad26_focosApagados_contras: boolean
  actividad26_focosApagados_laterales: boolean
  actividad27_zapatillasApagadas: boolean
  actividad27_routerEncendido: boolean
  actividad28_upsApagado: boolean
  actividad29_salaCerrada: boolean
  actividad30_checklistEnviado: boolean

  // Observaciones
  observaciones: string
}

const ChecklistDirector = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ChecklistDirectorData>({
    director: '',
    fecha: new Date().toISOString().split('T')[0],
    version: 'v5.13',
    actividad1_ups: false,
    actividad2_atem_camara1: false,
    actividad2_atem_camara2: false,
    actividad2_atem_camara3: false,
    actividad2_atem_pcGraficas: false,
    actividad2_atem_monitorLED: false,
    actividad2_atem_audio: false,
    actividad2_atem_rj45: false,
    actividad2_atem_usb: false,
    actividad2_atem_power: false,
    actividad3_luces_frontales: false,
    actividad3_luces_contras: false,
    actividad3_luces_laterales: false,
    actividad4_velocidadInternet: '',
    actividad5_transmisionProgramada: false,
    actividad6_claveYoutube: false,
    actividad7_nombreGrabacion: false,
    actividad8_transmisionActivada: false,
    actividad9_camara1_horiz: false,
    actividad9_camara1_diafragma: '',
    actividad9_camara1_colorTemp: '',
    actividad9_camara1_exposicion: '',
    actividad9_camara1_ganancia: '',
    actividad9_camara1_obtura: '',
    actividad9_camara2_horiz: false,
    actividad9_camara2_diafragma: '',
    actividad9_camara2_colorTemp: '',
    actividad9_camara2_exposicion: '',
    actividad9_camara2_ganancia: '',
    actividad9_camara2_obtura: '',
    actividad9_camara3_horiz: false,
    actividad9_camara3_diafragma: '',
    actividad9_camara3_colorTemp: '',
    actividad9_camara3_exposicion: '',
    actividad9_camara3_ganancia: '',
    actividad9_camara3_obtura: '',
    actividad10_audioCamarasApagado: false,
    actividad11_intercomunicadores: false,
    actividad12_monitoresCecilia: false,
    actividad13_videoMusicaTransmitir: false,
    actividad14_audioGraficasActivado: false,
    actividad15_oracion: false,
    actividad16_audioGraficasApagado: false,
    actividad16_mic1Encendido: false,
    actividad17_videoIntroDesactivado: false,
    actividad18_grabacionActiva: false,
    actividad19_comentariosYoutube: false,
    actividad20_audioVideoYoutube: false,
    actividad21_whatsappGrupo: false,
    actividad22_intercomDirectorApagado: false,
    actividad23_transmisionFinalizadaATEM: false,
    actividad24_transmisionFinalizadaYoutube: false,
    actividad25_equiposGuardados: false,
    actividad26_focosApagados_frontales: false,
    actividad26_focosApagados_contras: false,
    actividad26_focosApagados_laterales: false,
    actividad27_zapatillasApagadas: false,
    actividad27_routerEncendido: false,
    actividad28_upsApagado: false,
    actividad29_salaCerrada: false,
    actividad30_checklistEnviado: false,
    observaciones: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImprimir = () => {
    generarPDFDirector(formData)
  }

  return (
    <div className="checklist-container">
      <div className="checklist-card">
        <div className="checklist-header">
          <div>
            <h1>CHECKLIST Director Transmisión IUC Viña del Mar Etchevers</h1>
            <div className="header-info">
              <div className="form-group inline">
                <label htmlFor="director">DIRECTOR:</label>
                <input
                  type="text"
                  id="director"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className="header-input"
                  required
                />
              </div>
              <div className="form-group inline">
                <label htmlFor="fecha">FECHA:</label>
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
              <div className="form-group inline">
                <label>v{formData.version}</label>
              </div>
            </div>
          </div>
          <button className="btn-volver" onClick={() => navigate('/')}>
            ← Volver al Menú
          </button>
        </div>

        <form className="checklist-form">
          {/* Setup and Pre-Transmission Checks */}
          <div className="form-section">
            <h2>1. Setup and Pre-Transmission Checks</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">1</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    name="actividad1_ups"
                    checked={formData.actividad1_ups}
                    onChange={handleChange}
                  />
                  <span>Encender UPS bajo mesa de equipos y conectar zapatillas en línea BATTERY</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">2</div>
              <div className="actividad-content">
                <span className="actividad-title">Conectar puertos en ATEM MiniPro:</span>
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_camara1" checked={formData.actividad2_atem_camara1} onChange={handleChange} />
                    <span>Cámaras HDMI (1, 2, 3)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_pcGraficas" checked={formData.actividad2_atem_pcGraficas} onChange={handleChange} />
                    <span>PC Gráficas (4)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_monitorLED" checked={formData.actividad2_atem_monitorLED} onChange={handleChange} />
                    <span>Monitor LED (HDMI OUT)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_audio" checked={formData.actividad2_atem_audio} onChange={handleChange} />
                    <span>Audio Plug 3,5mm (MIC1)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_rj45" checked={formData.actividad2_atem_rj45} onChange={handleChange} />
                    <span>RJ45 Router (ATEM CONTROL)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_usb" checked={formData.actividad2_atem_usb} onChange={handleChange} />
                    <span>Case de Disco duro USB (USB OUT)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad2_atem_power" checked={formData.actividad2_atem_power} onChange={handleChange} />
                    <span>Transformador Energía (POWER)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">3</div>
              <div className="actividad-content">
                <span className="actividad-title">Validar encendido de luces en salón principal:</span>
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad3_luces_frontales" checked={formData.actividad3_luces_frontales} onChange={handleChange} />
                    <span>Frontales</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad3_luces_contras" checked={formData.actividad3_luces_contras} onChange={handleChange} />
                    <span>Contras (en pared escenario)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad3_luces_laterales" checked={formData.actividad3_luces_laterales} onChange={handleChange} />
                    <span>Laterales</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">4</div>
              <div className="actividad-content">
                <label className="actividad-title">Comprobar velocidad internet de subida:</label>
                <input
                  type="text"
                  name="actividad4_velocidadInternet"
                  value={formData.actividad4_velocidadInternet}
                  onChange={handleChange}
                  placeholder="Mbps (sobre 5Mbps)"
                  className="text-input-small"
                />
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">5</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad5_transmisionProgramada" checked={formData.actividad5_transmisionProgramada} onChange={handleChange} />
                  <span>Programar transmisión en YOUTUBE STUDIO</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">6</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad6_claveYoutube" checked={formData.actividad6_claveYoutube} onChange={handleChange} />
                  <span>Copiar clave YOUTUBE STUDIO en ATEM Software Control</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">7</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad7_nombreGrabacion" checked={formData.actividad7_nombreGrabacion} onChange={handleChange} />
                  <span>Cambiar nombre de grabación indicando el día en ATEM Software Control</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">8</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad8_transmisionActivada" checked={formData.actividad8_transmisionActivada} onChange={handleChange} />
                  <span>Activar transmisión en ATEM MiniPro o ATEM Software Control</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">9</div>
              <div className="actividad-content">
                <span className="actividad-title">Cámara: Horiz. | Diafragma | Temp. Color | Expos. | Ganancia | Vel. Obtura.</span>
                <div className="camara-settings">
                  <div className="camara-group">
                    <h4>Cámara 1 (G70)</h4>
                    <div className="camara-inputs">
                      <label><input type="checkbox" name="actividad9_camara1_horiz" checked={formData.actividad9_camara1_horiz} onChange={handleChange} /> Horiz.</label>
                      <input type="text" name="actividad9_camara1_diafragma" value={formData.actividad9_camara1_diafragma} onChange={handleChange} placeholder="f/" className="tiny-input" />
                      <input type="text" name="actividad9_camara1_colorTemp" value={formData.actividad9_camara1_colorTemp} onChange={handleChange} placeholder="kelvin" className="tiny-input" />
                      <input type="text" name="actividad9_camara1_exposicion" value={formData.actividad9_camara1_exposicion} onChange={handleChange} placeholder="expos." className="tiny-input" />
                      <input type="text" name="actividad9_camara1_ganancia" value={formData.actividad9_camara1_ganancia} onChange={handleChange} placeholder="(db)" className="tiny-input" />
                      <input type="text" name="actividad9_camara1_obtura" value={formData.actividad9_camara1_obtura} onChange={handleChange} placeholder="/" className="tiny-input" />
                    </div>
                  </div>
                  <div className="camara-group">
                    <h4>Cámara 2 (G50)</h4>
                    <div className="camara-inputs">
                      <label><input type="checkbox" name="actividad9_camara2_horiz" checked={formData.actividad9_camara2_horiz} onChange={handleChange} /> Horiz.</label>
                      <input type="text" name="actividad9_camara2_diafragma" value={formData.actividad9_camara2_diafragma} onChange={handleChange} placeholder="f/" className="tiny-input" />
                      <input type="text" name="actividad9_camara2_colorTemp" value={formData.actividad9_camara2_colorTemp} onChange={handleChange} placeholder="kelvin" className="tiny-input" />
                      <input type="text" name="actividad9_camara2_exposicion" value={formData.actividad9_camara2_exposicion} onChange={handleChange} placeholder="expos." className="tiny-input" />
                      <input type="text" name="actividad9_camara2_ganancia" value={formData.actividad9_camara2_ganancia} onChange={handleChange} placeholder="(db)" className="tiny-input" />
                      <input type="text" name="actividad9_camara2_obtura" value={formData.actividad9_camara2_obtura} onChange={handleChange} placeholder="/" className="tiny-input" />
                    </div>
                  </div>
                  <div className="camara-group">
                    <h4>Cámara 3 (G20)</h4>
                    <div className="camara-inputs">
                      <label><input type="checkbox" name="actividad9_camara3_horiz" checked={formData.actividad9_camara3_horiz} onChange={handleChange} /> Horiz.</label>
                      <input type="text" name="actividad9_camara3_diafragma" value={formData.actividad9_camara3_diafragma} onChange={handleChange} placeholder="f/" className="tiny-input" />
                      <input type="text" name="actividad9_camara3_colorTemp" value={formData.actividad9_camara3_colorTemp} onChange={handleChange} placeholder="kelvin" className="tiny-input" />
                      <input type="text" name="actividad9_camara3_exposicion" value={formData.actividad9_camara3_exposicion} onChange={handleChange} placeholder="expos." className="tiny-input" />
                      <input type="text" name="actividad9_camara3_ganancia" value={formData.actividad9_camara3_ganancia} onChange={handleChange} placeholder="(db)" className="tiny-input" />
                      <input type="text" name="actividad9_camara3_obtura" value={formData.actividad9_camara3_obtura} onChange={handleChange} placeholder="/" className="tiny-input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">10</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad10_audioCamarasApagado" checked={formData.actividad10_audioCamarasApagado} onChange={handleChange} />
                  <span>Apagar canales de audio de cámaras en ATEM MiniPro</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">11</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad11_intercomunicadores" checked={formData.actividad11_intercomunicadores} onChange={handleChange} />
                  <span>Comprobar intercomunicadores entre Director y Camarógrafos</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">12</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad12_monitoresCecilia" checked={formData.actividad12_monitoresCecilia} onChange={handleChange} />
                  <span>Validar encendido de monitores en salón Cecilia (cámara y DataShow)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pre-Live Countdown */}
          <div className="form-section">
            <h2>2. Pre-Live Countdown</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">13</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad13_videoMusicaTransmitir" checked={formData.actividad13_videoMusicaTransmitir} onChange={handleChange} />
                  <span><strong>15 minutos antes de inicio, TRANSMITIR EN VIVO</strong> video/música de PC Gráficas</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">14</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad14_audioGraficasActivado" checked={formData.actividad14_audioGraficasActivado} onChange={handleChange} />
                  <span>Activar audio para canal gráficas y validar audio de YOUTUBE</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">15</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad15_oracion" checked={formData.actividad15_oracion} onChange={handleChange} />
                  <span>Orar a Dios antes de transmitir en vivo</span>
                </label>
              </div>
            </div>
          </div>

          {/* During Live Transmission */}
          <div className="form-section en-vivo-section">
            <h2>3. E N V I V O</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">16</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad16_audioGraficasApagado" checked={formData.actividad16_audioGraficasApagado} onChange={handleChange} />
                  <span>Apagar canal de audio de PC Gráficas</span>
                </label>
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad16_mic1Encendido" checked={formData.actividad16_mic1Encendido} onChange={handleChange} />
                  <span>Encender MIC1</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">17</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad17_videoIntroDesactivado" checked={formData.actividad17_videoIntroDesactivado} onChange={handleChange} />
                  <span>Desactivar video introducción en PC Gráficas y llevar al aire cámara</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">18</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad18_grabacionActiva" checked={formData.actividad18_grabacionActiva} onChange={handleChange} />
                  <span>Activar grabación en disco duro conectado a ATEM MiniPro</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">19</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad19_comentariosYoutube" checked={formData.actividad19_comentariosYoutube} onChange={handleChange} />
                  <span>Monitorear recurrentemente comentarios YOUTUBE</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">20</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad20_audioVideoYoutube" checked={formData.actividad20_audioVideoYoutube} onChange={handleChange} />
                  <span>Monitorear recurrentemente audio y video de YOUTUBE</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">21</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad21_whatsappGrupo" checked={formData.actividad21_whatsappGrupo} onChange={handleChange} />
                  <span>Monitorear recurrentemente grupo WhatsApp de Transmisión IUC</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">22</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad22_intercomDirectorApagado" checked={formData.actividad22_intercomDirectorApagado} onChange={handleChange} />
                  <span>Apagar micrófono intercomunicador Director al no estar camarógrafos</span>
                </label>
              </div>
            </div>
          </div>

          {/* Post-Transmission */}
          <div className="form-section">
            <h2>4. Post-Transmission</h2>
            
            <div className="actividad-item">
              <div className="actividad-number">23</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad23_transmisionFinalizadaATEM" checked={formData.actividad23_transmisionFinalizadaATEM} onChange={handleChange} />
                  <span>Finalizar transmisión en ATEM MiniPro</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">24</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad24_transmisionFinalizadaYoutube" checked={formData.actividad24_transmisionFinalizadaYoutube} onChange={handleChange} />
                  <span><strong>FINALIZAR TRANSMISIÓN</strong> en YOUTUBE STUDIO</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">25</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad25_equiposGuardados" checked={formData.actividad25_equiposGuardados} onChange={handleChange} />
                  <span>Guardar cámaras, trípodes e intercomunicadores en sala transmisión</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">26</div>
              <div className="actividad-content">
                <span className="actividad-title">Confirmar apagado de focos en salón principal:</span>
                <div className="sub-actividades">
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad26_focosApagados_frontales" checked={formData.actividad26_focosApagados_frontales} onChange={handleChange} />
                    <span>Frontales</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad26_focosApagados_contras" checked={formData.actividad26_focosApagados_contras} onChange={handleChange} />
                    <span>Contras (en pared escenario)</span>
                  </label>
                  <label className="checkbox-group">
                    <input type="checkbox" name="actividad26_focosApagados_laterales" checked={formData.actividad26_focosApagados_laterales} onChange={handleChange} />
                    <span>Laterales</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">27</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad27_zapatillasApagadas" checked={formData.actividad27_zapatillasApagadas} onChange={handleChange} />
                  <span>Apagar zapatillas eléctricas</span>
                </label>
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad27_routerEncendido" checked={formData.actividad27_routerEncendido} onChange={handleChange} />
                  <span>Confirmar que ROUTER quede encendido</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">28</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad28_upsApagado" checked={formData.actividad28_upsApagado} onChange={handleChange} />
                  <span>Apagar UPS y desenchufarla de red eléctrica</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">29</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad29_salaCerrada" checked={formData.actividad29_salaCerrada} onChange={handleChange} />
                  <span>Confirmar cierre de ventanas y cierre de sala de Transmisión</span>
                </label>
              </div>
            </div>

            <div className="actividad-item">
              <div className="actividad-number">30</div>
              <div className="actividad-content">
                <label className="checkbox-group">
                  <input type="checkbox" name="actividad30_checklistEnviado" checked={formData.actividad30_checklistEnviado} onChange={handleChange} />
                  <span>Enviar CHECKLIST Director completa a grupo de WhatsApp de Transmisión</span>
                </label>
              </div>
            </div>
          </div>

          {/* Observaciones */}
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
            <button type="button" className="btn-imprimir" onClick={handleImprimir}>
              📄 Imprimir PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChecklistDirector
