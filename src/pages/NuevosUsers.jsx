import React, { useState, useEffect } from "react";
import md5 from 'md5';
import { FaRegTrashAlt } from "react-icons/fa";

const RegistroUsuarios = () => {
  // State para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // State para controlar el modo de edición
  const [modoEdicion, setModoEdicion] = useState(false);

  // State para almacenar el usuario seleccionado para editar
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // State para almacenar la información del nuevo usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    name: '',
    apellido: '',
    correo: '',
    contr: '',
  });

  // useEffect para cargar la lista de usuarios desde el almacenamiento local al montar el componente
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("Usuario")) || [];
    setUsuarios(storedUsers);
  }, []);

  // Función para manejar el clic en un usuario, utilizado para la edición
  const handleClickUsuario = async (nombre, correo) => {
    const usuario = usuarios.find((u) => u.name === nombre && u.correo === correo);
    setUsuarioSeleccionado(usuario);
    setModoEdicion(true);
    
    // Cargar la información del usuario en los campos de entrada
    setNuevoUsuario({
      ...usuarioSeleccionado,
      name: usuario.name,
      apellido: usuario.apellido,
      correo: usuario.correo,
      contr: usuario.contr,
    });
  };


  // Función para guardar los cambios en un usuario existente
  const guardarCambios = async () => {
    if (!nuevoUsuario.name || !nuevoUsuario.correo || !nuevoUsuario.apellido) {
      return;
    }
  
    // Verificar si se está editando un usuario
    if (modoEdicion && usuarioSeleccionado) {
      // Comprobar si la contraseña ha cambiado antes de encriptarla nuevamente
      const contrEncriptada = nuevoUsuario.contr !== usuarioSeleccionado.contr
        ? await encriptarContraseña(nuevoUsuario.contr)
        : usuarioSeleccionado.contr;
  
      // Actualizar la información del usuario
      const usuarioActualizado = {
        ...usuarioSeleccionado,
        name: nuevoUsuario.name,
        apellido: nuevoUsuario.apellido,
        correo: nuevoUsuario.correo,
        contr: contrEncriptada,
      };
  
      // Encontrar el índice del usuario que se está editando
      const index = usuarios.findIndex((u) => u === usuarioSeleccionado);
  
      // Actualizar el array de usuarios
      const usuariosActualizados = [...usuarios];
      usuariosActualizados[index] = usuarioActualizado;
  
      // Actualizar el estado y el almacenamiento local
      setUsuarios(usuariosActualizados);
      localStorage.setItem("Usuario", JSON.stringify(usuariosActualizados));
    } else {
      // Si no está en modo de edición, agregar un nuevo usuario
      const contrEncriptada = await encriptarContraseña(nuevoUsuario.contr);
  
      const nuevoUsuarioEncriptado = {
        name: nuevoUsuario.name,
        apellido: nuevoUsuario.apellido,
        correo: nuevoUsuario.correo,
        contr: contrEncriptada,
      };
  
      const usuariosActualizados = [...usuarios, nuevoUsuarioEncriptado];
  
      localStorage.setItem("Usuario", JSON.stringify(usuariosActualizados));
  
      setUsuarios(usuariosActualizados);
    }
  
    setModoEdicion(false);
    window.location.reload();
  };
  

  // Función para encriptar una contraseña usando md5
  const encriptarContraseña = async (contr) => {
    const contrEncriptada = md5(contr);
    return contrEncriptada;
  };

  // Función para manejar la presentación del formulario
  const handlesubmit = async (e) => {
    e.preventDefault();
    guardarCambios();
  };

  // Función para eliminar un usuario
  const eliminarUsuario = (index) => {
    const updatedUsers = [...usuarios];
    updatedUsers.splice(index, 1);
    setUsuarios(updatedUsers);
    localStorage.setItem("Usuario", JSON.stringify(updatedUsers));
    window.location.reload();
  };

  return (
    <div className="container21">
      <form action="" className="form3" onSubmit={handlesubmit}>
        <h1 className="title">{modoEdicion ? "Editar Usuario" : "Registrar Usuario"}</h1>

        <div className="inp">
          <input
            type="text"
            className="input"
            placeholder="Nombre"
            value={nuevoUsuario.name}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, name: e.target.value })}
          />
        </div>
        <div className="inp">
          <input
            type="text"
            className="input"
            placeholder="Apellido"
            value={nuevoUsuario.apellido}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
          />
        </div>
        <div className="inp">
          <input
            type="text"
            className="input"
            placeholder="Correo"
            value={nuevoUsuario.correo}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
          />
        </div>
        
        <div className="inp">
            <input
              type="password"
              className="input"
              placeholder="Contraseña"
              value={nuevoUsuario.contr}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contr: e.target.value })}
            />
          </div>
        
        
          
        
        <div className="buttons-container">
          <button type="submit" className="submit">
            {modoEdicion ? "Guardar Cambios" : "Registrar"}
          </button>
          {modoEdicion && (
            <button type="button" className="cancel" onClick={() => {
              setModoEdicion(false)
              window.location.reload()
              }}>
            Cancelar
          </button>
        )}
      </div>
    </form>

    {/* Mostrar la lista de usuarios A SER EDITADOS O ELIMINADOS (AUN NO FUNCIONA DEBIDO A PROBLEMAS CON CONSUMO DE API)*/}
    <div className="usuarios2">
      <h2 className="title2">Usuarios</h2>
      <ul style={{ marginTop: '70px' }}>
        {usuarios.map((usuario, index) => (
          <li
            onClick={() => handleClickUsuario(usuario.name, usuario.correo)}
            className="usuarioss"
            key={`${usuario.name}-${usuario.correo}-${index}`}
          >
            {usuario.name} {usuario.apellido}

            {usuario.correo !== 'admin' && (
              <button className="delete-button" onClick={() => eliminarUsuario(index)}>
                <FaRegTrashAlt className="iconbin" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    
  </div>
);
};


export default RegistroUsuarios;

