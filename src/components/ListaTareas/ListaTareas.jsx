import React from 'react';
import Tarea from '../Tarea/Tarea';
import styles from './ListaTareas.module.css';

const ListaTareas = ({ tareas, eliminarTarea, actualizarTarea, setTareaEditando }) => {
  if (!tareas.length) {
    return <p>No hay tareas, ¡agrega una!</p>;
  }

  return (
    <div className={styles.lista}>
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          eliminarTarea={eliminarTarea}
          actualizarTarea={actualizarTarea}
          setTareaEditando={setTareaEditando}
        />
      ))}
    </div>
  );
};

export default ListaTareas;