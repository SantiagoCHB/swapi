import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

function DetalleNave() {
  const { id } = useParams();
  const [nave, setNave] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const esFavorito = favoritos.some(fav => fav.id === id);
  const navigate = useNavigate();

  const toggleFavorito = () => {
    if (esFavorito) {
      // Eliminar de favoritos
      setFavoritos(favoritos.filter((fav) => fav.id !== id || fav.tipo !== 'nave'));
    } else {
      // Agregar a favoritos
      setFavoritos([...favoritos, { id, nombre: nave?.properties.name, tipo: 'nave' }]);
    }
  };

  useEffect(() => {
    const fetchNave = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/starships/${id}`);
        const data = await res.json();

        if (data?.result) {
          setNave(data.result);
        } else {
          console.error('Nave no encontrada');
        }
      } catch (error) {
        console.error('Error cargando detalles de la nave:', error);
      }
    };

    fetchNave();
  }, [id]);

  return (
    <div className='c-detalle'>
      {nave ? (
        <>
          <h1>{nave.properties.name}</h1>
          <img
            src={`/assets/naves/${nave.uid}.jpg`} // Imagen de la nave
            onError={(e) => { e.target.src = '/assets/naves/default.jpeg'; }} // Imagen por defecto si no se encuentra la nave
            alt={nave.properties.name}
            width='auto'
            height='200'
            loading='lazy'
          />
          <ul>
            <li><strong>Modelo:</strong> {nave.properties.model}</li>
            <li><strong>Fabricante:</strong> {nave.properties.manufacturer}</li>
            <li><strong>Costo:</strong> {nave.properties.cost_in_credits} créditos</li>
            <li><strong>Longitud:</strong> {nave.properties.length} m</li>
            <li><strong>Velocidad máxima:</strong> {nave.properties.max_atmosphering_speed} km/h</li>
            <li><strong>Cantidad de tripulantes:</strong> {nave.properties.crew}</li>
            <li><strong>Cantidad de pasajeros:</strong> {nave.properties.passengers}</li>
            <li><strong>Clase:</strong> {nave.properties.starship_class}</li>
          </ul>
          <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
          </button>
        </>
      ) : (
        <p>Cargando detalles de la nave...</p>
      )}
    </div>
  );
}

export default DetalleNave;
