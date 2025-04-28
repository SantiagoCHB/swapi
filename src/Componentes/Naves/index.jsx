import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtro from '../Filtro';
import  LogoTitulo from '../LogoTitulo/LogoTitulo';
import './style.css';

function Naves() {
  const [data, setData] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useState('All');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const resultados = data.filter(nave => {
    const nombre = nave?.properties?.name?.toLowerCase() || "";

    if (busqueda.length > 0) {
      return nombre.startsWith(busqueda.toLowerCase());
    }

    if (letraSeleccionada !== 'All') {
      return nombre.startsWith(letraSeleccionada.toLowerCase());
    }

    return true; // Mostrar todos si no hay filtro ni búsqueda
  });

  useEffect(() => {
    document.title = 'Universo Star Wars - Naves';
  }, []);

  useEffect(() => {
    const fetchNaves = async () => {
      try {
        let allNaves = [];
        let nextPage = `https://www.swapi.tech/api/starships/`;

        // Hacer solicitudes hasta que no haya más páginas
        while (nextPage) {
          const res = await fetch(nextPage);
          const data = await res.json();

          allNaves = allNaves.concat(data.results);

          nextPage = data.next; // URL para la siguiente página
        }

        const navesValidas = allNaves
          .filter(nave => nave?.name)
          .map(nave => ({
            uid: nave.uid,
            name: nave.name,
            url: nave.url
          }));

        setData(navesValidas);
      } catch (error) {
        console.error('Error cargando naves:', error);
      }
    };

    fetchNaves();
  }, []);

  const handleLetraChange = (letra) => {
    setLetraSeleccionada(letra);
    setBusqueda(''); // Limpiar búsqueda cuando seleccionas una letra
  };

  return (
    <>
      <LogoTitulo />
      <h2>Naves</h2>
      <input
        type="text"
        placeholder="Buscar nave"
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
          <p>Cargando naves...</p>
        ) : (
          resultados.map((nave, index) => (
            <div className='c-lista-pokemon' key={index} onClick={() => navigate(`/nave/${nave.uid}`)}>
              <img
                src={`/assets/naves/${nave.uid}.jpg`} // Asegúrate de tener las imágenes en la carpeta assets/naves
                onError={(e) => { e.target.src = '/assets/naves/default.jpeg'; }} // Imagen por defecto si no se encuentra la nave
                alt={nave.name}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{nave.name}</p>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Naves;
