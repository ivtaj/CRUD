import React, { useState, useEffect } from 'react';
import FormularioTarea from './components/FormularioTarea/FormularioTarea';
import ListaTareas from './components/ListaTareas/ListaTareas';

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  // Cargar tareas desde localStorage al iniciar la aplicación
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Actualizar localStorage cada vez que cambie el estado de las tareas
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (tarea) => {
    const nuevaTarea = {
      id: Date.now(),
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      completada: false,
    };
    setTareas(prevTareas => [...prevTareas, nuevaTarea]);
  };

  const actualizarTarea = (id, actualizacion) => {
    setTareas(prevTareas =>
      prevTareas.map(tarea =>
        tarea.id === id ? { ...tarea, ...actualizacion } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
  };

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <FormularioTarea
        agregarTarea={agregarTarea}
        actualizarTarea={actualizarTarea}
        tareaEditando={tareaEditando}
        setTareaEditando={setTareaEditando}
      />
      <ListaTareas
        tareas={tareas}
        eliminarTarea={eliminarTarea}
        actualizarTarea={actualizarTarea}
        setTareaEditando={setTareaEditando}
      />
    </div>
  );
};

export default App;