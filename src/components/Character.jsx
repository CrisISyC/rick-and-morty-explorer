import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Character.css";

function Characters({ characters }) {
  const handleImageError = (e) => {
    const img = e.target;
    const retryCount = parseInt(img.dataset.retryCount || "0");
    const maxRetries = 2;

    // Si ya se manejó el error final, no hacer nada
    if (img.dataset.errorHandled === "true") return;

    if (retryCount < maxRetries) {
      // Reintentar cargando la imagen nuevamente
      img.dataset.retryCount = (retryCount + 1).toString();
      const originalSrc = img.dataset.originalSrc || img.src;
      img.dataset.originalSrc = originalSrc;
      
      // Esperar un momento antes de reintentar
      setTimeout(() => {
        img.src = originalSrc + `?retry=${retryCount + 1}`;
      }, 1000 * (retryCount + 1)); // Espera incremental: 1s, 2s
    } else {
      // Después de todos los reintentos, mostrar placeholder
      img.dataset.errorHandled = "true";
      console.warn(`Image failed after ${maxRetries} retries: ${img.alt}`);
      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23ddd' width='300' height='300'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
      img.style.opacity = "1";
    }
  };

  const handleImageLoad = (e) => {
    e.target.style.opacity = "1";
    // Limpiar datos de reintento si la imagen cargó exitosamente
    delete e.target.dataset.retryCount;
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
              loading="lazy"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ opacity: 0, transition: 'opacity 0.3s ease-in' }}
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
