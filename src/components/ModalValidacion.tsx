import './ModalValidacion.css'

interface ModalValidacionProps {
  actividadesFaltantes: string[]
  onConfirmar: () => void
  onCancelar: () => void
}

const ModalValidacion = ({ actividadesFaltantes, onConfirmar, onCancelar }: ModalValidacionProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>⚠️ Actividades Pendientes</h2>
        <p>Las siguientes actividades aún no han sido completadas:</p>
        <ul className="lista-actividades">
          {actividadesFaltantes.map((actividad, idx) => (
            <li key={idx}>{actividad}</li>
          ))}
        </ul>
        <p className="pregunta">¿Desea continuar y generar el PDF de todas maneras?</p>
        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn-continuar" onClick={onConfirmar}>
            Continuar de todas maneras
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalValidacion

