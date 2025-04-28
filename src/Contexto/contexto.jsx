import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Inicializamos los favoritos desde localStorage si existen
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
  const [favoritos, setFavoritos] = useState(favoritosGuardados);

  const [data, setData] = useState([]);  // Aquí manejarás todos los datos de los diferentes tipos
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All'); // Tipo seleccionado: planetas, especies, personajes, naves

  // Manejo de localStorage para los favoritos
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Aquí puedes agregar lógica para cargar los datos dependiendo del tipoSeleccionado
  useEffect(() => {
    const obtenerDatos = async () => {
      if (tipoSeleccionado === 'planetas') {
        const res = await fetch('https://www.swapi.tech/api/planets');
        const json = await res.json();
        setData(json.results);
      } else if (tipoSeleccionado === 'especies') {
        const res = await fetch('https://www.swapi.tech/api/species');
        const json = await res.json();
        setData(json.results);
      } else if (tipoSeleccionado === 'personajes') {
        const res = await fetch('https://www.swapi.tech/api/people');
        const json = await res.json();
        setData(json.results);
      } else if (tipoSeleccionado === 'naves') {
        const res = await fetch('https://www.swapi.tech/api/starships');
        const json = await res.json();
        setData(json.results);
      } else {
        // Si es All, cargamos todos los datos
        const resPlanetas = await fetch('https://www.swapi.tech/api/planets');
        const jsonPlanetas = await resPlanetas.json();
        const resEspecies = await fetch('https://www.swapi.tech/api/species');
        const jsonEspecies = await resEspecies.json();
        const resPersonajes = await fetch('https://www.swapi.tech/api/people');
        const jsonPersonajes = await resPersonajes.json();
        const resNaves = await fetch('https://www.swapi.tech/api/starships');
        const jsonNaves = await resNaves.json();
        setData([
          ...jsonPlanetas.results, 
          ...jsonEspecies.results, 
          ...jsonPersonajes.results, 
          ...jsonNaves.results
        ]);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  return (
    <AppContext.Provider value={{
      favoritos, setFavoritos,
      data, setData,
      tipoSeleccionado, setTipoSeleccionado
    }}>
      {children}
    </AppContext.Provider>
  );
}
