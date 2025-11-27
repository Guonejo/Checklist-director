import './ModalConfirmacion.css'

interface ModalConfirmacionProps {
  titulo: string
  mensaje: string
  textoConfirmar?: string
  textoCancelar?: string
  onConfirmar: () => void
  onCancelar: () => void
}

const ModalConfirmacion = ({ 
  titulo, 
  mensaje, 
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar, 
  onCancelar 
}: ModalConfirmacionProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{titulo}</h2>
        <p>{mensaje}</p>
        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onCancelar}>
            {textoCancelar}
          </button>
          <button className="btn-continuar" onClick={onConfirmar}>
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacion

