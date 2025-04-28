import { useContext, useEffect } from 'react';
import { AppContext } from '../../Contexto/contexto';
import { useNavigate } from 'react-router-dom';
import  LogoTitulo from '../LogoTitulo/LogoTitulo';
import './style.css';

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Universo Star Wars - Favoritos';
  }, []);

  return (
    <>
      <LogoTitulo />
      <h2>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>No hay favoritos aún.</p>
      ) : (
        <section className="c-lista">
          {favoritos.map((item, index) => (
            <div
              className="c-lista-pokemon"
              key={index}
              onClick={() => {
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
                    : item.tipo === 'planeta'
                    ? `/assets/planetas/${item.id}.jpg`
                    : '/assets/default.jpeg'
                }
                alt={item.nombre}
                width="auto"
                height="60"
                loading="lazy"
                onError={(e) => { e.target.src = '/assets/default.jpeg'; }}
              />
              <p>{item.nombre}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default Favoritos;
