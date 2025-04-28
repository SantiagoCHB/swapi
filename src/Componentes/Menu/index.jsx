import { useState } from 'react'
import { Link } from 'react-router-dom';
import './style.css'

function Menu() {

    return (
        <nav className="c-menu">
          <Link to="/">Personajes</Link>
          <Link to="/planeta">Planetas</Link>
          <Link to="/nave">Naves</Link>
          <Link to="/especie">Especies</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/usuario">Usuario</Link>
        </nav>
    )
}

export default Menu