import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import md5 from 'md5'; 

function Registro() {
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contr, setContr] = useState('');
  const [nulo, setNulo] = useState(false);
  const [login, setLogin] = useState(false);
  const [login2, setLogin2] = useState(true);

  useEffect(() => {
    
    const storedUsers = JSON.parse(localStorage.getItem("Usuario")) || [];

    if (storedUsers.length > 0) {
      
      console.log("Usuarios registrados:", storedUsers);
    }
  }, []);

  function handlesubmit(e) {
    e.preventDefault();

    if (!name || !correo || !apellido || !contr) {
      setNulo(true);
      setTimeout(() => {
        setNulo(false);
      }, 4000);
    } else {
      setNulo(false);

      // Encripta la contraseña con MD5
      const contrEncriptada = md5(contr);

      // Recupera la lista actual de usuarios almacenada en localStorage
      const storedUsers = JSON.parse(localStorage.getItem("Usuario")) || [];

      // Agrega el nuevo usuario a la lista con la contraseña encriptada
      const newUser = { name, apellido, correo, contr: contrEncriptada };
      const updatedUsers = [...storedUsers, newUser];

      // Almacena la lista actualizada en localStorage
      localStorage.setItem("Usuario", JSON.stringify(updatedUsers));
      
      setLogin(true);
      setLogin2(false);
      console.log(localStorage.getItem('Usuario'))
    }
  }

  return (
    <>
      <div>
        <form action="" className="form2" onSubmit={handlesubmit}>
          <h1 className="title">Regístrate</h1>

          <div className="inp">
                <input
                type="text"
                className="input"
                placeholder="Nombre"
                onChange={(e) => {
                const inputText = e.target.value;
                const formattedName =
                inputText.charAt(0).toUpperCase() + inputText.slice(1);
                setName(formattedName);
                }}
                />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="inp">
          <input
                type="text"
                className="input"
                placeholder="Apellido"
                onChange={(e) => {
                const inputText = e.target.value;
                const formattedApellido =
                inputText.charAt(0).toUpperCase() + inputText.slice(1);
                setApellido(formattedApellido);
                }}
                />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="inp">
            <input type="text" className="input" placeholder="Correo" onChange={(e) => (setCorreo(e.target.value))} />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="inp">
            <input type="password" className="input" placeholder="Contraseña" onChange={(e) => (setContr(e.target.value))} />
            <i className="fa-solid fa-lock"></i>
          </div>
          <button type="submit" className="submit">Registrarse</button>
          <h4>¿Ya tienes una cuenta?</h4>
          {login && (
            <>
              <div className="exitoso">
                Registro exitoso
              </div>
            </>
          )}
          <NavLink id="registroBot" to={'/'}>Iniciar Sesión</NavLink>
          {nulo && (
            <>
              <div className="mal">
                *Llena todos los campos*
              </div>
            </>
          )}

        </form>
        <div></div>
      </div>

    </>
  );
}

export default Registro;