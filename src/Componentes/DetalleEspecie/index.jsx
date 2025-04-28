import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useParams } from 'react-router-dom';
import './style.css';

function DetalleEspecie() {
  const { id } = useParams();
  const { favoritos, setFavoritos } = useContext(AppContext);

  const [especie, setEspecie] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    // Verificar si la especie está en los favoritos
    const especieFavorita = favoritos.find(
      (fav) => fav.id === id && fav.tipo === 'especie'
    );
    setEsFavorito(!!especieFavorita);
  }, [favoritos, id]); // Asegurarnos de que se actualice cuando cambia favoritos


  const toggleFavorito = () => {
    if (esFavorito) {
      // Eliminar de favoritos
      setFavoritos(
        favoritos.filter((fav) => fav.id !== id || fav.tipo !== 'especie')
      );
    } else {
      // Agregar a favoritos
      setFavoritos([
        ...favoritos,
        { id, nombre: especie?.properties.name, tipo: 'especie' },
      ]);
    }
  };
  useEffect(() => {
    const fetchEspecie = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/species/${id}`);
        const data = await response.json();

        if (data?.result?.properties) {
          setEspecie(data.result);
        } else {
          console.error('No se encontró la especie.');
        }
      } catch (error) {
        console.error('Error cargando los detalles de la especie:', error);
      }
    };

    fetchEspecie();
  }, [id]);

  if (!especie) {
    return <p>Cargando especie...</p>;
  }

  const { name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, homeworld } = especie.properties;

  return (
    <div className="c-detalle-especie">
      <h2>{name}</h2>
      <img
        src={`/assets/especies/${id}.jpg`}
        alt={name}
        onError={(e) => { e.target.src = '/assets/especies/default.jpeg'; }}
        width="200"
        height="auto"
        loading="lazy"
      />
      <div className="detalle-info">
        <p><strong>Clasificación:</strong> {classification}</p>
        <p><strong>Designación:</strong> {designation}</p>
        <p><strong>Altura promedio:</strong> {average_height} cm</p>
        <p><strong>Colores de piel:</strong> {skin_colors}</p>
        <p><strong>Colores de cabello:</strong> {hair_colors}</p>
        <p><strong>Colores de ojos:</strong> {eye_colors}</p>
        <p><strong>Esperanza de vida promedio:</strong> {average_lifespan} años</p>
        <p><strong>Mundo natal:</strong> {homeworld}</p>
      </div>
      <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
          </button>
    </div>
  );
}

export default DetalleEspecie;
