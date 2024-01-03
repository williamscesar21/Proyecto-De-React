import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import md5 from 'md5';


const Perfil = () => {
  // Obtener el usuario actual del localStorage
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

  // Estados para controlar el modo de edición y los nuevos valores del usuario
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(usuarioActual.name);
  const [nuevoApellido, setNuevoApellido] = useState(usuarioActual.apellido);
  const [nuevoCorreo, setNuevoCorreo] = useState(usuarioActual.correo);
  const [nuevoContr, setNuevoContr] = useState(usuarioActual.contr);

  // Función para guardar los cambios realizados en el perfil
  const guardarCambios = async () => {
    // Obtener la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('Usuario')) || [];

    // Crear un nuevo objeto de usuario con los valores actualizados
    const usuarioActualizado = {
      ...usuarioActual,
      name: nuevoNombre,
      apellido: nuevoApellido,
      correo: nuevoCorreo,
      contr: await encriptarContraseña(nuevoContr),
    };

    // Encontrar el índice del usuario actual en la lista de usuarios
    const indiceUsuarioActual = usuarios.findIndex(
      (usuario) => usuario.name === usuarioActual.name && usuario.correo === usuarioActual.correo
    );

    // Actualizar el usuario en la lista de usuarios
    usuarios[indiceUsuarioActual] = usuarioActualizado;

    // Guardar la lista de usuarios actualizada en el localStorage
    localStorage.setItem('Usuario', JSON.stringify(usuarios));

    // Actualizar el usuario actual en el localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));

    // Desactivar el modo de edición
    setModoEdicion(false);
  }

  const salir = ()=>{
    setModoEdicion(false);
  }
  const encriptarContraseña = async (contr) => {
    const contrEncriptada = md5(contr);
    return contrEncriptada;
  };

  return (
    <div className="perfil">
      {/* SVG para mostrar las iniciales del nombre y apellido del usuario */}
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="3" fill="#fff" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fill="black">
          {usuarioActual.name[0].toUpperCase()}{usuarioActual.apellido[0].toUpperCase()}
        </text>
      </svg>

      {/* Renderizar el formulario de edición o la información del perfil */}
      {modoEdicion ? (
        <div className='form4'>
          <input className='input2' type="text" placeholder='Nuevo Nombre' value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
          <input className='input2' type="text" placeholder='Nuevo Apellido' value={nuevoApellido} onChange={(e) => setNuevoApellido(e.target.value)} />
          <input className='input2' type="text" placeholder='Nuevo Correo' value={nuevoCorreo} onChange={(e) => setNuevoCorreo(e.target.value)} />
          <input className='input2' type="text" placeholder='Nueva Clave' onChange={(e) => setNuevoContr(e.target.value)} />
          <button style={{marginTop:'10px', marginBottom:'5px'}} onClick={guardarCambios}>Guardar</button>
          <button style={{marginTop:'10px', marginBottom:'5px'}}  onClick={salir}>Cancelar</button>
        </div>
      ) : (
        <>
          {/* Mostrar la información del perfil */}
          <h1>{usuarioActual.name} {usuarioActual.apellido}</h1>
          <p>{usuarioActual.correo}</p>
          
          {/* Botón para activar el modo de edición con el icono de edición */}
          {!modoEdicion && <button onClick={() => setModoEdicion(true)}><CiEdit style={{fontSize:'30px'}}/></button>}
        </>
      )}
    </div>
  );
};

export default Perfil;
