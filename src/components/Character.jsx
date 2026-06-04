import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Character.css";

function Characters({ characters }) {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
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
