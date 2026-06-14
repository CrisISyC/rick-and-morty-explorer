import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheets/CharacterDetail.css"

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23ddd' width='300' height='300'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
  };

  useEffect(() => {
    let isMounted = true; // Prevenir actualizaciones si el componente se desmonta
    
    const fetchCharacter = async (retryCount = 0) => {
      if (!isMounted) return;
      
      const maxRetries = 2; // Intentar hasta 3 veces (inicial + 2 reintentos)
      
      setLoading(true);
      if (retryCount === 0) {
        setError(null);
      }
      
      // Validar que el ID esté en el rango válido (1-826)
      const characterId = parseInt(id);
      if (isNaN(characterId) || characterId < 1 || characterId > 826) {
        if (isMounted) {
          setError(`Personaje #${id} no existe. Solo hay 826 personajes (IDs 1-826).`);
          setLoading(false);
        }
        return;
      }
      
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
        if (!isMounted) return;
        
        if (!res.ok) {
          if (res.status === 404) {
            setError(`Personaje #${id} no encontrado en la API`);
            setLoading(false);
            return;
          } else if (res.status === 429) {
            // Rate limiting - reintentar después de más tiempo
            if (retryCount < maxRetries) {
              console.log(`⚠️ Rate limit alcanzado, reintentando en 2 segundos... (${retryCount + 1}/${maxRetries})`);
              setTimeout(() => fetchCharacter(retryCount + 1), 2000);
              return;
            }
            setError(`Demasiadas peticiones. Por favor espera un momento e intenta de nuevo.`);
            setLoading(false);
            return;
          } else {
            throw new Error(`HTTP ${res.status}`);
          }
        }
        
        const data = await res.json();
        
        if (isMounted) {
          setCharacter(data);
          setLoading(false);
          if (retryCount > 0) {
            console.log(`✅ Personaje #${id} cargado después de ${retryCount} reintentos`);
          }
        }
        
      } catch (error) {
        if (!isMounted) return;
        
        console.warn(`⚠️ Intento ${retryCount + 1}/${maxRetries + 1} falló para personaje #${id}:`, error.message);
        
        // Si aún quedan reintentos, intentar de nuevo después de 1 segundo
        if (retryCount < maxRetries) {
          console.log(`🔄 Reintentando en 1 segundo...`);
          setTimeout(() => fetchCharacter(retryCount + 1), 1000);
        } else {
          // Último intento falló
          if (error.message === 'Failed to fetch') {
            setError(`No se pudo conectar con la API después de ${maxRetries + 1} intentos. Por favor recarga la página.`);
          } else {
            setError(`Error: ${error.message}`);
          }
          setLoading(false);
        }
      }
    };

    // Pequeño delay inicial para evitar rate limiting en desarrollo
    const timeoutId = setTimeout(() => fetchCharacter(0), 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="character-detail">
        <h2>Cargando personaje...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="character-detail">
        <h2 style={{ color: 'red' }}>{error}</h2>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="character-detail">
        <h2>Personaje no encontrado</h2>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        loading="eager"
        onError={handleImageError}
      />
      <p><strong>ID:</strong> {character.id}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
      <p><strong>Location:</strong> {character.location.name}</p>
      <p><strong>Created:</strong> {new Date(character.created).toLocaleDateString()}</p>

      <Link to="/" className="back-link">Volver</Link>
    </div>
  );
}

export default CharacterDetail;
