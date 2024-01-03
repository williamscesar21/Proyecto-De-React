import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiHome, CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { CiChat1 } from "react-icons/ci";

function Aside() {

  // Clave para obtener el estado de 'asideOpen' en el localStorage
  const LOCAL_STORAGE_KEY = "asideOpen";

  // Recupera el estado inicial de asideOpen desde localStorage
  const initialAsideOpen = localStorage.getItem(LOCAL_STORAGE_KEY) === "true" || false;
  const [asideOpen, setAsideOpen] = useState(initialAsideOpen);

  // Define el nuevo método para cambiar el estado y almacenarlo en localStorage
  const toggleAside = () => {
    setAsideOpen(prevState => {
      const newState = !prevState;
      localStorage.setItem(LOCAL_STORAGE_KEY, newState.toString());
      return newState;
    });
  };

  // Verifica si el usuario actual es un administrador
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'))?.correo === 'admin';

  // Componente funcional para los enlaces de la barra de navegación
  const NavbarLink = ({ to, icon: Icon, children, onClick }) => (
    <NavLink to={to} className="nav-link"  onClick={onClick}>
      {asideOpen ? (
        // Muestra el icono solamente en modo cerrado
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {Icon && <Icon className="iconos" style={{ marginRight: '0px' }} />}
        </div>
      ) : (
        // Muestra el icono y el texto en modo abierto
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {Icon && <Icon className="iconos" style={{ marginRight: '5px' }} />}
          {children}
        </div>
      )}
    </NavLink>
  );

  // Método para cerrar sesión
  const logout = () => {
    localStorage.setItem('logueo', false);
    localStorage.setItem('usuarioActual', []);
    window.reload();
  };

  return (
    <aside className={`sidebar${asideOpen ? "open" : ""}`}>
      {/* Logotipo con evento onClick para alternar el estado de 'asideOpen' */}
      <div className="logo" onClick={toggleAside}>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/008/470/778/small/3d-render-basic-shape-ico-sphere-primitive-icon-illustration-with-glossy-finish-element-free-png.png" alt="" />
      </div>
      {/* Barra de navegación con enlaces */}
      <nav className="nav">
        <NavbarLink to="/" icon={CiHome}>
          General
        </NavbarLink>
        <NavbarLink to="/perfil" icon={CgProfile}>
          Perfil
        </NavbarLink>
        <NavbarLink to="/chatbot" icon={CiChat1}>
          Chatbot
        </NavbarLink>
        {/* Muestra el enlace de Usuarios solo si el usuario es un administrador */}
        {usuario && (
          <NavbarLink to="/admin/UsersRegister" icon={GrUserAdmin}>
            Usuarios
          </NavbarLink>
        )}
        {/* Enlace para cerrar sesión con el ícono de logout y el evento onClick */}
        <NavbarLink to="/login" icon={CiLogout} onClick={logout}>
          Cerrar Sesión
        </NavbarLink>
      </nav>
    </aside>
  );
}

export default Aside;
