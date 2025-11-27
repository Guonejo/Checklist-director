import jsPDF from 'jspdf'

interface FormData {
  [key: string]: any
}

interface ChecklistDirectorData extends FormData {
  director: string
  fecha: string
  version: string
  observaciones: string
  actividad4_velocidadInternet: string
  [key: string]: any
}

interface ChecklistGraficasData extends FormData {
  designadoGraficas: string
  fecha: string
  [key: string]: any
}

const addPageIfNeeded = (doc: jsPDF, yPosition: number, pageHeight: number, margin: number = 40) => {
  if (yPosition > pageHeight - margin) {
    doc.addPage()
    return 20
  }
  return yPosition
}

const dibujarTablaActividad = (
  doc: jsPDF,
  ok: string,
  numero: string,
  actividad: string,
  x: number,
  y: number,
  anchoOk: number,
  anchoNum: number,
  anchoAct: number,
  altura: number,
  completa: boolean
) => {
  // Dibujar líneas de la tabla
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.1)
  
  // Línea vertical después de OK
  doc.line(x + anchoOk, y, x + anchoOk, y + altura)
  // Línea vertical después de Número
  doc.line(x + anchoOk + anchoNum, y, x + anchoOk + anchoNum, y + altura)
  // Línea horizontal inferior
  doc.line(x, y + altura, x + anchoOk + anchoNum + anchoAct, y + altura)
  
  // Escribir OK (checkbox)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  const okX = x + anchoOk / 2 - doc.getTextWidth(ok) / 2
  doc.text(ok, okX, y + altura / 2 + 2)
  
  // Escribir número
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(102, 126, 234)
  const numX = x + anchoOk + anchoNum / 2 - doc.getTextWidth(numero) / 2
  doc.text(numero, numX, y + altura / 2 + 2)
  
  // Escribir actividad
  doc.setFontSize(9)
  if (completa) {
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(34, 139, 34)
  } else {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
  }
  
  const actX = x + anchoOk + anchoNum + 3
  const actY = y + altura / 2 + 2
  const maxWidth = anchoAct - 6
  const lines = doc.splitTextToSize(actividad, maxWidth)
  
  if (lines.length === 1) {
    doc.text(lines[0], actX, actY)
  } else {
    // Si tiene múltiples líneas, ajustar verticalmente
    const lineHeight = 4
    const startY = actY - ((lines.length - 1) * lineHeight) / 2
    lines.forEach((line: string, idx: number) => {
      doc.text(line, actX, startY + idx * lineHeight)
    })
    return lines.length * lineHeight - 4 // Retornar altura ajustada
  }
  
  return altura
}

export const generarPDFDirector = (data: ChecklistDirectorData) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20
  const margin = 15
  const lineHeight = 7
  
  // Anchos de columnas
  const anchoOk = 15
  const anchoNum = 15
  const anchoAct = pageWidth - margin * 2 - anchoOk - anchoNum
  const alturaFila = 8

  // Título
  doc.setFontSize(14)
  doc.setTextColor(51, 51, 51)
  doc.setFont('helvetica', 'bold')
  const title = 'CHECKLIST Director Transmisión IUC Viña del Mar Etchevers'
  const titleWidth = doc.getTextWidth(title)
  doc.text(title, (pageWidth - titleWidth) / 2, yPosition)
  yPosition += 8

  // Información del encabezado
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text(`DIRECTOR: ${data.director || 'N/A'}`, margin, yPosition)
  doc.text(`FECHA: ${data.fecha || 'N/A'}`, margin + 70, yPosition)
  doc.text(`v${data.version || '5.13'}`, pageWidth - margin - 15, yPosition)
  yPosition += 10

  // Línea separadora
  doc.setDrawColor(102, 126, 234)
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 8

  // Encabezado de tabla
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, yPosition, anchoOk + anchoNum + anchoAct, 6, 'F')
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.2)
  doc.rect(margin, yPosition, anchoOk + anchoNum + anchoAct, 6)
  doc.line(margin + anchoOk, yPosition, margin + anchoOk, yPosition + 6)
  doc.line(margin + anchoOk + anchoNum, yPosition, margin + anchoOk + anchoNum, yPosition + 6)
  
  doc.text('OK', margin + anchoOk / 2 - doc.getTextWidth('OK') / 2, yPosition + 4.5)
  doc.text('#', margin + anchoOk + anchoNum / 2 - doc.getTextWidth('#') / 2, yPosition + 4.5)
  doc.text('ACTIVIDAD', margin + anchoOk + anchoNum + 3, yPosition + 4.5)
  yPosition += 7

  // Definir todas las actividades
  const actividades = [
    { key: 'actividad1_ups', text: 'Encender UPS bajo mesa de equipos y conectar zapatillas en línea BATTERY' },
    { key: 'actividad2_atem', text: 'Conectar puertos en ATEM MiniPro:', sub: [
      { key: 'actividad2_atem_camara1', text: 'Cámaras HDMI (1, 2, 3)' },
      { key: 'actividad2_atem_pcGraficas', text: 'PC Gráficas (4)' },
      { key: 'actividad2_atem_monitorLED', text: 'Monitor LED (HDMI OUT)' },
      { key: 'actividad2_atem_audio', text: 'Audio Plug 3,5mm (MIC1)' },
      { key: 'actividad2_atem_rj45', text: 'RJ45 Router (ATEM CONTROL)' },
      { key: 'actividad2_atem_usb', text: 'Case de Disco duro USB (USB OUT)' },
      { key: 'actividad2_atem_power', text: 'Transformador Energía (POWER)' }
    ]},
    { key: 'actividad3_luces', text: 'Validar encendido de luces en salón principal:', sub: [
      { key: 'actividad3_luces_frontales', text: 'Frontales' },
      { key: 'actividad3_luces_contras', text: 'Contras (en pared escenario)' },
      { key: 'actividad3_luces_laterales', text: 'Laterales' }
    ]},
    { key: 'actividad4_velocidadInternet', text: `Comprobar velocidad internet de subida: ${data.actividad4_velocidadInternet || 'N/A'} Mbps (sobre 5Mbps)`, isText: true },
    { key: 'actividad5_transmisionProgramada', text: 'Programar transmisión en YOUTUBE STUDIO' },
    { key: 'actividad6_claveYoutube', text: 'Copiar clave YOUTUBE STUDIO en ATEM Software Control' },
    { key: 'actividad7_nombreGrabacion', text: 'Cambiar nombre de grabación indicando el día en ATEM Software Control' },
    { key: 'actividad8_transmisionActivada', text: 'Activar transmisión en ATEM MiniPro o ATEM Software Control' },
    { key: 'actividad9_camaras', text: 'Cámara: Horiz. | Diafragma | Temp. Color | Expos. | Ganancia | Vel. Obtura.', isComplex: true },
    { key: 'actividad10_audioCamarasApagado', text: 'Apagar canales de audio de cámaras en ATEM MiniPro' },
    { key: 'actividad11_intercomunicadores', text: 'Comprobar intercomunicadores entre Director y Camarógrafos' },
    { key: 'actividad12_monitoresCecilia', text: 'Validar encendido de monitores en salón Cecilia (cámara y DataShow)' },
    { key: 'actividad13_videoMusicaTransmitir', text: '15 minutos antes de inicio, TRANSMITIR EN VIVO video/música de PC Gráficas' },
    { key: 'actividad14_audioGraficasActivado', text: 'Activar audio para canal gráficas y validar audio de YOUTUBE' },
    { key: 'actividad15_oracion', text: 'Orar a Dios antes de transmitir en vivo' },
    { key: 'actividad16_audioGraficasApagado', text: 'Apagar canal de audio de PC Gráficas y encender MIC1' },
    { key: 'actividad17_videoIntroDesactivado', text: 'Desactivar video introducción en PC Gráficas y llevar al aire cámara' },
    { key: 'actividad18_grabacionActiva', text: 'Activar grabación en disco duro conectado a ATEM MiniPro' },
    { key: 'actividad19_comentariosYoutube', text: 'Monitorear recurrentemente comentarios YOUTUBE' },
    { key: 'actividad20_audioVideoYoutube', text: 'Monitorear recurrentemente audio y video de YOUTUBE' },
    { key: 'actividad21_whatsappGrupo', text: 'Monitorear recurrentemente grupo WhatsApp de Transmisión IUC' },
    { key: 'actividad22_intercomDirectorApagado', text: 'Apagar micrófono intercomunicador Director al no estar camarógrafos' },
    { key: 'actividad23_transmisionFinalizadaATEM', text: 'Finalizar transmisión en ATEM MiniPro' },
    { key: 'actividad24_transmisionFinalizadaYoutube', text: 'FINALIZAR TRANSMISIÓN en YOUTUBE STUDIO' },
    { key: 'actividad25_equiposGuardados', text: 'Guardar cámaras, trípodes e intercomunicadores en sala transmisión' },
    { key: 'actividad26_focos', text: 'Confirmar apagado de focos en salón principal:', sub: [
      { key: 'actividad26_focosApagados_frontales', text: 'Frontales' },
      { key: 'actividad26_focosApagados_contras', text: 'Contras (en pared escenario)' },
      { key: 'actividad26_focosApagados_laterales', text: 'Laterales' }
    ]},
    { key: 'actividad27_zapatillas', text: 'Apagar zapatillas eléctricas y confirmar que ROUTER quede encendido', sub: [
      { key: 'actividad27_zapatillasApagadas', text: 'Zapatillas apagadas' },
      { key: 'actividad27_routerEncendido', text: 'Router encendido' }
    ]},
    { key: 'actividad28_upsApagado', text: 'Apagar UPS y desenchufarla de red eléctrica' },
    { key: 'actividad29_salaCerrada', text: 'Confirmar cierre de ventanas y cierre de sala de Transmisión' },
    { key: 'actividad30_checklistEnviado', text: 'Enviar CHECKLIST Director completa a grupo de WhatsApp de Transmisión' }
  ]

  // Función para verificar si una actividad está completa
  const actividadCompleta = (act: any): boolean => {
    if (act.isText || act.isComplex) return true
    if (data[act.key] === true) return true
    if (act.sub) {
      return act.sub.some((sub: any) => data[sub.key] === true)
    }
    return false
  }

  // Escribir actividades
  actividades.forEach((act, idx) => {
    yPosition = addPageIfNeeded(doc, yPosition, pageHeight, 30)
    
    const completa = actividadCompleta(act)
    const ok = completa ? '✓' : '☐'
    const numero = (idx + 1).toString()
    const actividad = act.text.replace(/^\d+\.\s*/, '') // Remover número si existe
    
    const altura = dibujarTablaActividad(doc, ok, numero, actividad, margin, yPosition, anchoOk, anchoNum, anchoAct, alturaFila, completa)
    yPosition += Math.max(altura, alturaFila) + 1

    // Sub-actividades
    if (act.sub) {
      act.sub.forEach((sub: any) => {
        if (data[sub.key] === true) {
          yPosition = addPageIfNeeded(doc, yPosition, pageHeight, 20)
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(34, 139, 34)
          doc.text(`  • ${sub.text}`, margin + anchoOk + anchoNum + 3, yPosition)
          yPosition += 5
        }
      })
    }

    // Configuración de cámaras
    if (act.key === 'actividad9_camaras') {
      const camaras = [
        { num: 1, pos: 'G70' },
        { num: 2, pos: 'G50' },
        { num: 3, pos: 'G20' }
      ]
      
      camaras.forEach(cam => {
        if (data[`actividad9_camara${cam.num}_horiz`]) {
          yPosition = addPageIfNeeded(doc, yPosition, pageHeight, 20)
          doc.setFontSize(8)
          doc.setTextColor(0, 0, 0)
          const diaf = data[`actividad9_camara${cam.num}_diafragma`] || ''
          const temp = data[`actividad9_camara${cam.num}_colorTemp`] || ''
          const expo = data[`actividad9_camara${cam.num}_exposicion`] || ''
          const gan = data[`actividad9_camara${cam.num}_ganancia`] || ''
          const obt = data[`actividad9_camara${cam.num}_obtura`] || ''
          doc.text(`  • Cámara ${cam.num} (${cam.pos}): f/${diaf} | ${temp}K | Exp:${expo} | Gan:${gan} | Obt:${obt}`, margin + anchoOk + anchoNum + 3, yPosition)
          yPosition += 5
        }
      })
    }

    // Marcar secciones especiales
    if (idx === 14) { // Antes de EN VIVO
      yPosition += 3
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(231, 76, 60)
      doc.text('E N V I V O', margin + anchoOk + anchoNum + anchoAct / 2 - doc.getTextWidth('E N V I V O') / 2, yPosition)
      yPosition += 6
    }
  })

  // Observaciones
  if (data.observaciones && data.observaciones.trim() !== '') {
    yPosition = addPageIfNeeded(doc, yPosition, pageHeight, 40)
    yPosition += 5
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('Observaciones, mejoras, problemas:', margin, yPosition)
    yPosition += 6

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    const observacionesLines = doc.splitTextToSize(data.observaciones, pageWidth - 2 * margin)
    observacionesLines.forEach((line: string) => {
      yPosition = addPageIfNeeded(doc, yPosition, pageHeight)
      doc.text(line, margin, yPosition)
      yPosition += 5
    })
  }

  // Pie de página
  const totalPages = doc.internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth - margin - 25,
      pageHeight - 10
    )
    doc.text(
      `Generado el: ${new Date().toLocaleDateString('es-ES')}`,
      margin,
      pageHeight - 10
    )
  }

  // Guardar PDF
  const fileName = `CHECKLIST_Director_${data.fecha || new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

export const generarPDFGraficas = (data: ChecklistGraficasData) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20
  const margin = 15
  const lineHeight = 7
  
  // Anchos de columnas
  const anchoOk = 15
  const anchoNum = 15
  const anchoAct = pageWidth - margin * 2 - anchoOk - anchoNum
  const alturaFila = 8

  // Título
  doc.setFontSize(14)
  doc.setTextColor(51, 51, 51)
  doc.setFont('helvetica', 'bold')
  const title = 'CHECKLIST Gráficas Transmisión IUC Viña del Mar Etchevers'
  const titleWidth = doc.getTextWidth(title)
  doc.text(title, (pageWidth - titleWidth) / 2, yPosition)
  yPosition += 8

  // Información del encabezado
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text(`Designado Gráficas: ${data.designadoGraficas || 'N/A'}`, margin, yPosition)
  doc.text(`Fecha: ${data.fecha || 'N/A'}`, margin + 90, yPosition)
  yPosition += 10

  // Línea separadora
  doc.setDrawColor(102, 126, 234)
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 8

  // Encabezado de tabla
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, yPosition, anchoOk + anchoNum + anchoAct, 6, 'F')
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.2)
  doc.rect(margin, yPosition, anchoOk + anchoNum + anchoAct, 6)
  doc.line(margin + anchoOk, yPosition, margin + anchoOk, yPosition + 6)
  doc.line(margin + anchoOk + anchoNum, yPosition, margin + anchoOk + anchoNum, yPosition + 6)
  
  doc.text('OK', margin + anchoOk / 2 - doc.getTextWidth('OK') / 2, yPosition + 4.5)
  doc.text('Numero', margin + anchoOk + anchoNum / 2 - doc.getTextWidth('Numero') / 2, yPosition + 4.5)
  doc.text('Actividad', margin + anchoOk + anchoNum + 3, yPosition + 4.5)
  yPosition += 7

  // Definir todas las actividades
  const actividades = [
    { key: 'actividad1_prenderPC', text: 'Prender PC Gráficas' },
    { key: 'actividad2_correo', text: 'Introducir correo (medios_iuc@gmail.com)' },
    { key: 'actividad3_perfilTransmision', text: 'Ingresar a perfil de transmisión o unión cristiana' },
    { key: 'actividad4_whatsappQR', text: 'Conectar WhatsApp mediante código QR en Google' },
    { key: 'actividad5_descargarMaterial', text: 'Descargar material enviado a chat transmisiones en WhatsApp' },
    { key: 'actividad6_corroboraMaterial', text: 'Abrir carpeta de descargas y corroborar material del día' },
    { key: 'actividad7_abrirPresenter', text: 'Abrir presenter (plantilla utilizada recientemente)' },
    { key: 'actividad8_seleccionarOrdenCulto', text: 'Seleccionar barra izquierda con orden del culto del día' },
    { key: 'actividad9_actualizarFecha', text: 'Actualizar fecha del día' },
    { key: 'actividad10_verificarDiapositivaLogo', text: 'Verificar diapositiva logo chroma baja cada nombre de bloque' },
    { key: 'actividad11_verificarVideos', text: 'Verificar video introducción (10 minutos) y video outro' },
    { key: 'actividad12_verificarVolumen', text: 'Verificar volumen pc gráficas al 100%' },
    { key: 'actividad13_zonaBloqueAlabanzas', text: 'Zona bloque 1 y 2 de alabanzas' },
    { key: 'actividad14_eliminarAlabanzasAnteriores', text: 'Eliminar alabanzas del culto anterior' },
    { key: 'actividad15_seleccionarCanciones', text: 'Seleccionar barra superior derecha y abrir canciones' },
    { key: 'actividad16_arrastrarAlabanzas', text: 'Seleccionar de 1 en 1 por su nombre cada alabanza del día y arrastrar a barra izquierda' },
    { key: 'actividad17_aplicarMedios', text: 'Aplicar medios en presenter' },
    { key: 'actividad18_importarMedios', text: 'Importar medios (avisos y doxología)' },
    { key: 'actividad19_abrirPPT', text: 'Abrir ppt en carpeta descargas' },
    { key: 'actividad20_editarSlice', text: 'Editar slice en presenter' },
    { key: 'actividad21_editarPPT', text: 'Editar ppt en pantalla verde (nombre pastor y titulo culto, tomar versículos de ppt y pegar sin formato en plantilla presenter) (máximo 3 líneas)' },
    { key: 'actividad22_sincronizarDatos', text: 'Ahora en presenter sincronizar datos' },
    { key: 'actividad23_reproducirVideoIntro', text: 'Reproducir video introducción (iniciar 09:50 am)' },
    { key: 'actividad24_bloqueAlabanzas', text: 'Bloque 1 y 2 de alabanzas (seleccionar alabanza y letra)' },
    { key: 'actividad25_seleccionarVersiculo', text: 'Durante predica seleccionar diapositiva con versículo que lee el pastor y dejar tiempo prudente (app 10 seg post lectura)' },
    { key: 'actividad26_seleccionarImagenDoxologia', text: 'En doxología seleccionar imagen en barra izquierda (durante la lectura)' },
    { key: 'actividad27_reproducirVideoOutro', text: 'Reproducir video outro bajo orden del director' },
    { key: 'actividad28_cerrarProgramas', text: 'Cerrar programas y apagar pc gráficas' },
    { key: 'actividad29_limpiarEstacion', text: 'Dejar estación de gráficas limpia y organizada' }
  ]

  // Escribir actividades
  actividades.forEach((act, idx) => {
    yPosition = addPageIfNeeded(doc, yPosition, pageHeight, 30)
    
    const completa = data[act.key] === true
    const ok = completa ? '✓' : '☐'
    const numero = (idx + 1).toString()
    const actividad = act.text.replace(/^\d+\.\s*/, '')
    
    const altura = dibujarTablaActividad(doc, ok, numero, actividad, margin, yPosition, anchoOk, anchoNum, anchoAct, alturaFila, completa)
    yPosition += Math.max(altura, alturaFila) + 1
  })

  // Pie de página
  const totalPages = doc.internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth - margin - 25,
      pageHeight - 10
    )
    doc.text(
      `Generado el: ${new Date().toLocaleDateString('es-ES')}`,
      margin,
      pageHeight - 10
    )
  }

  // Guardar PDF
  const fileName = `CHECKLIST_Graficas_${data.fecha || new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

// Mantener función genérica por compatibilidad
export const generarPDF = (data: FormData, titulo: string) => {
  if (titulo.includes('Director')) {
    generarPDFDirector(data as ChecklistDirectorData)
  } else if (titulo.includes('Gráficas')) {
    generarPDFGraficas(data as ChecklistGraficasData)
  }
}
