import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheets/CharacterDetail.css"

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <h2>Cargando personaje...</h2>;

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} onError={handleImageError} />
      <p><strong>ID:</strong> {character.id}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
      <p><strong>Location:</strong> {character.location.name}</p>
      <p><strong>Created:</strong> {character.created}</p>

      <Link to="/" className="back-link"> return</Link>
    </div>
  );
}

export default CharacterDetail;
