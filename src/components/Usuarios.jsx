import React from "react";

function Usuarios() {
  // Obtener la lista de usuarios desde el localStorage o inicializarla como un arreglo vacío
  const usuarios = JSON.parse(localStorage.getItem("Usuario")) || [];

  // Ordenar los usuarios por nombre y apellido en orden alfabético
  const usuariosOrdenados = usuarios.sort((a, b) =>
    a.name.concat(a.apellido).localeCompare(b.name.concat(b.apellido))
  );

  return (
    <aside className="sidebar2">
      <div>
        <h2 className="list">Listado de Usuarios</h2>
        
        {/* Renderizar la lista de usuarios ordenados */}
        <ul>
          {usuariosOrdenados.map((usuario, index) => (
            <li className="usuarioss" key={index}>
              {usuario.name} {usuario.apellido}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Usuarios;
