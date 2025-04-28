import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './Contexto/contexto';
import './App.css'

import Planetas from './Componentes/Planetas'
import Naves from './Componentes/Naves'
import Favoritos from './Componentes/Favoritos'
import Personajes from './Componentes/Personajes'
import Especies from './Componentes/Especies'
import Usuario from './Componentes/Usuario'
import Menu from './Componentes/Menu'
import DetallePersonaje from './Componentes/DetallePersonaje';
import DetallePlaneta from './Componentes/DetallePlaneta';
import DetalleNave from './Componentes/DetalleNave';
import DetalleEspecie from './Componentes/DetalleEspecie';

function App() {

  return (
    <AppProvider>
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Personajes />} />
        <Route path="/usuario" element={<Usuario/>} />
        <Route path="/planeta" element={<Planetas />} />
        <Route path="/nave" element={<Naves />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/especie" element={<Especies />} />
        <Route path="/personaje/:id" element={<DetallePersonaje />} />
        <Route path="/planeta/:id" element={<DetallePlaneta />} />
        <Route path="/nave/:id" element={<DetalleNave />} />
        <Route path="/especie/:id" element={<DetalleEspecie />} />
      </Routes>
    </Router>
    </AppProvider>
  )
}

export default App