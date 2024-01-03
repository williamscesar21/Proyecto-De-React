import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import md5 from 'md5';

function Login() {
  // Obtener la lista de usuarios desde el localStorage
  const usuarios = JSON.parse(localStorage.getItem("Usuario")) || [];

  // Referencias a los campos de entrada para correo y contraseña
  const user = useRef();
  const pass = useRef();

  // Estados para gestionar el estado de inicio de sesión y la visibilidad de la contraseña
  const [logueado, setLogueado] = useState(false);
  const [mal, setMal] = useState(false);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  // Establecer el estado de 'incorrecto' (componente que se muestra cuando hay un a credencial incorrecta) en el localStorage como falso al cargar el componente
  localStorage.setItem('incorrecto', false);

  // Función para validar las credenciales al intentar iniciar sesión
  const validar = () => {
    // Obtener los valores ingresados para correo y contraseña
    const correoIngresado = user.current.value;
    const contrIngresada = pass.current.value;

    // Convertir la contraseña ingresada a encriptación MD5
    const contrIngresadaMD5 = md5(contrIngresada);

    // Buscar el usuario con las credenciales ingresadas en la lista de usuarios
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.correo === correoIngresado && usuario.contr === contrIngresadaMD5
    );

    // Verificar si se encontró un usuario válido
    if (usuarioEncontrado) {
      // Establecer el estado de logueado como verdadero
      setLogueado(true);
      
      // Almacenar el usuario actual en el localStorage
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));

      // Establecer el estado de logueo como verdadero en el localStorage
      localStorage.setItem("logueo", true);

      // Recargar la página después de un breve intervalo (500 milisegundos)
      setInterval(() => {
        window.location.reload();
      }, 500);
    } else {
      // Si las credenciales son inválidas, mostrar un mensaje de error
      setMal(true);
      setTimeout(() => {
        setMal(false);
      }, 4000);
    }
  };
  

  // Función para alternar la visibilidad de la contraseña
  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  return (
    <>
      <div action="" className="form">
        <h1 className="title">Inicia Sesión</h1>

        <div className="inp">
          <input type="text" className="input" placeholder="Correo" ref={user} />
          <i className="fa-solid fa-user"></i>
        </div>

        {/* Campo de entrada para la contraseña con opción de mostrar/ocultar */}
        <div className="inp">
          <input
            type={mostrarContraseña ? "text" : "password"}
            className="input"
            placeholder="Contraseña"
            ref={pass}
          />
          <i className="fa-solid fa-lock"></i>
          <button
            type="button"
            className="mostrar-contrasena"
            onClick={toggleMostrarContraseña}
          >
            {mostrarContraseña ? <BiHide size="1.5em" /> : <BiShow size="1.5em" />}
          </button>
        </div>

        <NavLink
          to={'/'}
          className="submit"
          onClick={validar}
          onSubmit={(e) => {
            e.preventDefault(e);
          }}
        >
          Iniciar Sesión
        </NavLink>

        {/* Mostrar mensaje de inicio de sesión exitoso si logueado es verdadero */}
        {logueado ? (
          <>
            <div className="exitoso">Inicio de Sesión Exitoso</div>
          </>
        ) : (
          <></>
        )}

        {/* Mostrar mensaje de credenciales inválidas si mal es verdadero */}
        {mal ? (
          <>
            <div className="mal">Credenciales Inválidas</div>
          </>
        ) : (
          <></>
        )}
        
        <h4>¿No tienes una cuenta?</h4>
        <NavLink id="registroBot" to={"/registro"}>
          Regístrate
        </NavLink>
      </div>
      <div></div>
    </>
  );
}

export default Login;
