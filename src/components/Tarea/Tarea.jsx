import React from 'react';
import styles from './Tarea.module.css';

const Tarea = ({ tarea, eliminarTarea, actualizarTarea, setTareaEditando }) => {
  const { id, titulo, descripcion, completada } = tarea;

  const handleEliminar = () => {
    eliminarTarea(id);
  };

  const handleEditar = () => {
    setTareaEditando(tarea);
  };

  const handleCambioCheckbox = (e) => {
    actualizarTarea(id, { completada: e.target.checked });
  };

  return (
    <div className={styles.tarea}>
      <input
        type="checkbox"
        checked={completada}
        onChange={handleCambioCheckbox}
      />
      <h3 className={completada ? styles.titleCompleted : null}>
        {titulo}
      </h3>
      <p>{descripcion}</p>
      <button className={`${styles.btn} ${styles.btnEliminar}`} onClick={handleEliminar}>
        Eliminar
      </button>
      <button className={`${styles.btn} ${styles.btnEditar}`} onClick={handleEditar}>
        Editar
      </button>
    </div>
  );
};

export default Tarea;