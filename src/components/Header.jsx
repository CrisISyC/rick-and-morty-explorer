import React from "react";
import "../stylesheets/Header.css";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Asegúrate de que la imagen está en la ubicación correcta

function Header() {
  return (
    <header className="header">
      {/* Logo que redirige a la página principal al hacer clic */}
      <a href="/" className="logo">
        <img src={Logo} alt="Logo" />
      </a>

      {/* Barra de navegación con enlaces a diferentes secciones */}
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">Characters</Link>
          </li>
          <li>
            <Link to="/episodes" className="nav-link">Episodes</Link>
          </li>
          <li>
            <Link to="/locations" className="nav-link">Locations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

