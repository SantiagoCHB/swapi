import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useParams } from 'react-router-dom';
import './style.css'; // si quieres seguir usando el mismo estilo base

function DetallePersonaje() {
  const { id } = useParams(); // capturamos el id que viene en la URL
  const [personaje, setPersonaje] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const toggleFavorito = () => {
    const yaEsFavorito = favoritos.some(fav => String(fav.id) === String(id) && fav.tipo === 'personaje');

    if (yaEsFavorito) {
      setFavoritos(favoritos.filter(fav => !(String(fav.id) === String(id) && fav.tipo === 'personaje')));
    } else {
      setFavoritos([
        ...favoritos,
        { id: String(id), nombre: personaje?.properties?.name, tipo: 'personaje' }
      ]);
    }
  };
    
  useEffect(() => {
    const obtenerPersonaje = async () => {
      try {
        console.log("ID recibido en DetallePersonaje:", id);
        const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
        const data = await res.json();
        console.log("Datos del personaje:", data);
        setPersonaje(data.result);
      } catch (error) {
        console.error('Error al obtener el personaje:', error);
      } finally {
        setLoading(false);
      }
    };
  
    obtenerPersonaje();
  }, [id]);
  
  if (loading) {
    return <p>Cargando detalles del personaje...</p>;
  }

  if (!personaje) {
    return <p>No se encontró el personaje.</p>;
  }

  const { properties } = personaje;

  // 🔥 Ahora se recalcula dinámicamente esFavorito aquí
  const esFavorito = favoritos.some(fav => String(fav.id) === String(id) && fav.tipo === 'personaje');

  return (
    <div className="c-detalle">
      <h2>{properties.name}</h2>
      <img
        src={`/assets/personajes/${personaje.uid}.jpg`}
        alt={properties.name}
        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/personajes/default.jpeg'; }}
        width="auto"
        height="200"
        loading="lazy"
      />
      <ul>
        <li><strong>Altura:</strong> {properties.height} cm</li>
        <li><strong>Peso:</strong> {properties.mass} kg</li>
        <li><strong>Color de cabello:</strong> {properties.hair_color}</li>
        <li><strong>Color de piel:</strong> {properties.skin_color}</li>
        <li><strong>Color de ojos:</strong> {properties.eye_color}</li>
        <li><strong>Año de nacimiento:</strong> {properties.birth_year}</li>
        <li><strong>Género:</strong> {properties.gender}</li>
      </ul>
      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default DetallePersonaje;
