import React, { useState, useEffect } from 'react';
import styles from './FormularioTarea.module.css';

const FormularioTarea = ({ agregarTarea, actualizarTarea, tareaEditando, setTareaEditando }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo);
      setDescripcion(tareaEditando.descripcion);
    } else {
      setTitulo('');
      setDescripcion('');
    }
    setError('');
  }, [tareaEditando]);

  const handleTituloChange = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setError('El título es obligatorio');
    } else if (value.length > 50) {
      setError('El título no puede exceder 50 caracteres');
    } else {
      setError('');
    }
    setTitulo(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error || titulo.trim() === '') return;
    
    if (tareaEditando) {
      actualizarTarea(tareaEditando.id, { titulo, descripcion });
      setTareaEditando(null);
      setMensajeExito('Tarea actualizada con éxito');
    } else {
      agregarTarea({ titulo, descripcion });
      setMensajeExito('Tarea agregada con éxito');
    }
    
    setTitulo('');
    setDescripcion('');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          className={`${styles.input} ${error && styles.inputError}`}
          value={titulo}
          onChange={handleTituloChange}
        />
        {error && <div style={{ color: '#ff0000' }}>{error}</div>}
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          className={styles.input}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button className={styles.btn} type="submit" disabled={!!error || titulo.trim() === ''}>
        {tareaEditando ? 'Guardar Cambios' : 'Agregar Tarea'}
      </button>
      {mensajeExito && <div className={styles.successMessage}>{mensajeExito}</div>}
    </form>
  );
};

export default FormularioTarea;