import { useContext } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useNavigate } from 'react-router-dom';

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay favoritos aún.</p>
      ) : (
        <div className="c-lista">
          <h2>Favoritos</h2>
          {favoritos.map((item, index) => (
            <div
              className="c-lista-item"
              key={index}
              onClick={() => {
                // Navegamos a la ruta correcta según el tipo de item
                if (item.tipo === 'planeta') {
                  navigate(`/planeta/${item.id}`);
                } else if (item.tipo === 'personaje') {
                  navigate(`/personaje/${item.id}`);
                } else if (item.tipo === 'nave') {
                  navigate(`/nave/${item.id}`);
                } else if (item.tipo === 'especie') {
                  navigate(`/especie/${item.id}`);
                }
              }}
            >
              <img
                src={
                  item.tipo === 'especie'
                    ? `/assets/especies/${item.id}.jpg`
                    : item.tipo === 'personaje'
                    ? `/assets/personajes/${item.id}.jpg`
                    : item.tipo === 'nave'
                    ? `/assets/naves/${item.id}.jpg`
                    : '/assets/default.jpeg'
                }
                alt={item.nombre}
                width="100"
                height="auto"
                loading="lazy"
                onError={(e) => { e.target.src = '/assets/default.jpeg'; }} // Imagen por defecto si no existe
              />
              <p>{item.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;
