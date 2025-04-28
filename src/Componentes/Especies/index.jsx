import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filtro from '../Filtro'; // Asegúrate de importar el componente de Filtro
import './style.css';

function Especies() {
  const [data, setData] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useState('All');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const resultados = data.filter(especie => {
    const nombre = especie?.properties?.name?.toLowerCase() || "";

    if (busqueda.length > 0) {
      return nombre.startsWith(busqueda.toLowerCase());
    }

    if (letraSeleccionada !== 'All') {
      return nombre.startsWith(letraSeleccionada.toLowerCase());
    }

    return true; // Mostrar todos si no hay filtro ni búsqueda
  });

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 19; i++) {  // El número de especies puede variar, ajustalo si es necesario
          promises.push(fetch(`https://www.swapi.tech/api/species/${i}`).then(res => res.json()));
        }

        const results = await Promise.all(promises);

        // Filtrar solo los que sí tienen data válida
        const especiesValidas = results
          .filter(res => res?.result?.properties?.name)
          .map(res => res.result);

        setData(especiesValidas);
      } catch (error) {
        console.error('Error cargando especies:', error);
      }
    };

    fetchEspecies();
  }, []);

  const handleLetraChange = (letra) => {
    setLetraSeleccionada(letra);
    setBusqueda(''); // Limpiar búsqueda cuando seleccionas una letra
  };

  return (
    <div className="c-especies">
      <h2>Especies</h2>

      <input
        type="text"
        placeholder="Buscar especie"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setLetraSeleccionada('All'); // Resetear letra cuando escribes en buscador
        }}
        className="c-buscador"
      />

      <Filtro onLetraChange={handleLetraChange} />

      <section className="c-lista">
        {resultados.length === 0 ? (
          <p>Cargando especies...</p>
        ) : (
          resultados.map((especie) => (
            <div
              className="c-lista-item"
              key={especie.uid}
              onClick={() => navigate(`/especie/${especie.uid}`)}
            >
              <img
                src={`/assets/especies/${especie.uid}.jpg`}
                alt={especie.properties.name}
                onError={(e) => { e.target.src = '/assets/especies/default.jpeg'; }}
                width="100"
                height="auto"
                loading="lazy"
              />
              <p>{especie.properties.name}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Especies;
