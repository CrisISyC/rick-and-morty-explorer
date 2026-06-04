import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Character.css";

function Characters({ characters }) {
  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23ddd' width='300' height='300'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="characters-container">
      {characters.map((character) => (
        // Enlace a la página de detalles del personaje
        <Link to={`/character/${character.id}`} key={character.id} className="character-link">
          <div className="character-container">
            {/* Imagen del personaje */}
            <img
              className="image-character"
              src={character.image}
              alt={character.name}
              onError={handleImageError}
            />
            <div className="container-text">
              {/* Nombre del personaje */}
              <p className="name">{character.name}</p>

              {/* Información del estado y especie */}
              <div className="info-row">
                <p className="status">
                  {/* Punto de color indicando el estado (vivo, muerto, desconocido) */}
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(character.status) }}></span>
                  {character.status}
                </p>
                <p>-</p>
                <p className="species">{character.species}</p>
              </div>

              {/* Género del personaje */}
              <p className="gender">{character.gender}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/**
 * Determina el color de estado del personaje.
 * Verde para vivos, rojo para muertos y gris para desconocidos.
 */
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "alive":
      return "green";
    case "dead":
      return "red";
    default:
      return "gray";
  }
};

export default Characters;
