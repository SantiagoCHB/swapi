import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

function DetallePlaneta() {
  const { id } = useParams();
  const { favoritos, setFavoritos } = useContext(AppContext);

  const [planeta, setPlaneta] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    // Verificar si el planeta está en los favoritos
    const planetaFavorito = favoritos.find(
      (fav) => fav.id === id && fav.tipo === 'planeta'
    );
    setEsFavorito(!!planetaFavorito);
  }, [favoritos, id]);

  const toggleFavorito = () => {
    if (esFavorito) {
      // Eliminar de favoritos
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((fav) => fav.id !== id || fav.tipo !== 'planeta')
      );
    } else {
      // Agregar a favoritos
      setFavoritos((prevFavoritos) => [
        ...prevFavoritos,
        { id, nombre: planeta?.properties.name, tipo: 'planeta' },
      ]);
    }
  };

  useEffect(() => {
    const fetchPlaneta = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
        const data = await response.json();

        // Verificar si el planeta tiene información válida y establecer los datos
        if (data?.result?.properties) {
          setPlaneta(data.result);
        }
      } catch (error) {
        console.error('Error cargando los detalles del planeta:', error);
      }
    };

    fetchPlaneta();
  }, [id]);

  
  return (
    <div className="detalle-planeta">
      {planeta ? (
        <>
          <h2>{planeta.properties.name}</h2>
          <img
            src={`/assets/planetas/${planeta.uid}.jpg`}
            onError={(e) => { e.target.src = '/assets/planetas/default.jpeg'; }}
            alt={planeta.properties.name}
            width="200"
            height="auto"
            loading="lazy"
          />
          <div className="detalle-info">
            <p><strong>Clima:</strong> {planeta.properties.climate}</p>
            <p><strong>Gravedad:</strong> {planeta.properties.gravity}</p>
            <p><strong>Población:</strong> {planeta.properties.population}</p>
            <p><strong>Periodo de rotación:</strong> {planeta.properties.rotation_period}</p>
            <p><strong>Periodo orbital:</strong> {planeta.properties.orbital_period}</p>
          </div>
          <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'} Agregar a favoritos
          </button>
        </>
      ) : (
        <p>Cargando detalles del planeta...</p>
      )}
    </div>
  );
}

export default DetallePlaneta;
