import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtro from '../Filtro';
import  LogoTitulo from '../LogoTitulo/LogoTitulo';
import './style.css';

function Personajes() {
  const [data, setData] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useState('All');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const resultados = data.filter(personaje => {
    const nombre = personaje?.properties?.name?.toLowerCase() || "";

    if (busqueda.length > 0) {
      return nombre.startsWith(busqueda.toLowerCase());
    }

    if (letraSeleccionada !== 'All') {
      return nombre.startsWith(letraSeleccionada.toLowerCase());
    }

    return true; // Mostrar todos si no hay filtro ni búsqueda
  });

  useEffect(() => {
    document.title = 'Universo Star Wars - Personajes';
  }, []);
  

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const promises = [];

        for (let i = 1; i <= 83; i++) {
          promises.push(fetch(`https://www.swapi.tech/api/people/${i}`).then(res => res.json()));
        }

        const results = await Promise.all(promises);

        // Filtrar solo los que sí tienen data válida
        const personajesValidos = results
          .filter(res => res?.result?.properties?.name)
          .map(res => res.result);

        setData(personajesValidos);
      } catch (error) {
        console.error('Error cargando personajes:', error);
      }
    };

    fetchPersonajes();
  }, []);

  const handleLetraChange = (letra) => {
    setLetraSeleccionada(letra);
    setBusqueda(''); // Limpiar búsqueda cuando seleccionas una letra
  };

  return (
    <>
      <LogoTitulo />
      <h2>Personajes</h2>
      <input
        type="text"
        placeholder="Buscar personaje"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setLetraSeleccionada('All'); // Resetear letra cuando escribes en buscador
        }}
        className="c-buscador"
      />

      <Filtro onLetraChange={handleLetraChange} />

      <section className='c-lista'>
        
        {resultados.length === 0 ? (
          <p>Cargando personajes...</p>
        ) : (
          resultados.map((personaje, index) => (
            <div className='c-lista-pokemon'
              onClick={() => navigate(`/personaje/${personaje.uid}`)}
              key={index}
            >
              <img
                src={`/assets/personajes/${personaje.uid}.jpg`}
                onError={(e) => { e.target.src = '/assets/personajes/default.jpeg'; }}
                alt={personaje.properties.name}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{personaje.properties.name}</p>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Personajes;
