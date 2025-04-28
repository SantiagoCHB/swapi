import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtro from '../Filtro';
import  LogoTitulo from '../LogoTitulo/LogoTitulo';
import './style.css';

function Planetas() {
  const [data, setData] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useState('All');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const resultados = data.filter(planeta => {
    const nombre = planeta?.name?.toLowerCase() || ""; // Accedemos directamente a 'name'

    if (busqueda.length > 0) {
      return nombre.startsWith(busqueda.toLowerCase());
    }

    if (letraSeleccionada !== 'All') {
      return nombre.startsWith(letraSeleccionada.toLowerCase());
    }

    return true; // Mostrar todos si no hay filtro ni búsqueda
  });

  useEffect(() => {
    document.title = 'Universo Star Wars - Planetas';
  }, []);

  useEffect(() => {
    const fetchPlanetas = async () => {
      try {
        let url = 'https://www.swapi.tech/api/planets/';
        let allPlanets = [];
        
        // Continuar obteniendo planetas mientras haya una siguiente página
        while (url) {
          const response = await fetch(url);
          const data = await response.json();
          
          console.log("Respuesta de la API:", data);

          if (data?.results) {
            // Agregar los planetas de la página actual a la lista de todos los planetas
            allPlanets = [...allPlanets, ...data.results];
          }

          // Verificar si hay más planetas en la siguiente página
          url = data.next;
        }

        // Filtrar solo los que sí tienen data válida
        const planetasValidos = allPlanets
          .filter(res => res?.name) // Accedemos directamente a 'name' en lugar de 'properties.name'
          .map(res => res); // Almacenamos directamente el objeto del planeta

        console.log("Planetas obtenidos:", planetasValidos);

        setData(planetasValidos);
      } catch (error) {
        console.error('Error cargando planetas:', error);
      }
    };

    fetchPlanetas();
  }, []);

  const handleLetraChange = (letra) => {
    setLetraSeleccionada(letra);
    setBusqueda(''); // Limpiar búsqueda cuando seleccionas una letra
  };

  return (
    <>
      <LogoTitulo />
      <h2>Planetas</h2>
      <input
        type="text"
        placeholder="Buscar planeta"
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
          <p>Cargando planetas...</p>
        ) : (
          resultados.map((planeta, index) => (
            <div className='c-lista-pokemon' 
              onClick={() => navigate(`/planeta/${planeta.uid}`)} 
              key={index}
            >
              <img
                src={`/assets/planetas/${planeta.uid}.jpg`}
                onError={(e) => { e.target.src = '/assets/planetas/default.jpeg'; }}
                alt={planeta.name} // Cambié 'planeta.properties.name' a 'planeta.name'
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{planeta.name}</p> {/* Cambié 'planeta.properties.name' a 'planeta.name' */}
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Planetas;
