import LineChart from "../components/LineChart";
import LineChart2 from "../components/LineChart2";
import PieChart from "../components/PieChart";
import Usuarios from "../components/Usuarios";
import { useState, useEffect } from 'react'; 

function Home() {
  // Obtener el usuario actual del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

  // Estado para controlar la apertura/ cierre del componente "Aside" en el layout
  const [asideO, setAsideO] = useState(() => JSON.parse(localStorage.getItem('asideOpen')) || false);

  // Utilizar useEffect para ver cambios en el estado de "asideOpen" en localStorage
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAsideO(JSON.parse(localStorage.getItem('asideOpen')) || false);
    }, 1);
  }, []); 

  return (
    <div style={{ marginLeft: JSON.parse(asideO) ? '70px' : '220px' }} className="grid-container">
      <div className="welcomeBanner">
        <h1>Hola, {usuario.name} {usuario.apellido} </h1>
      </div>

      <div className="grid-content">
        <div className="banners">
          <div className="banner">
            <div>
              <h1>¿Quieres generar más dinero con tu emprendimiento?</h1>
              <p>Maximiza tus ganancias con nuestro exclusivo apoyo para emprendedores exitosos. ¡Descúbrelo ahora!</p>
              <button>¡Ver más!</button>
            </div>
          </div>
          <div className="banner">
            <div>
              <h1>Transforma tu pasión en ganancias</h1>
              <p>Convierte tu pasión en ganancias con productos únicos para el éxito empresarial.</p>
              <button>¡Ver más!</button>
            </div>
          </div>
        </div>

        {/* Gráficos estadísticos */}
        <div className="charts">
          <LineChart />
          <LineChart2 />
          <PieChart />
        </div>
      </div>

      {/* Componente que muestra el listado de usuarios */}
      <Usuarios/>
    </div>
  );
}

export default Home;
