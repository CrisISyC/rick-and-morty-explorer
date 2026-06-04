import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheets/CharacterDetail.css"

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23ddd' width='300' height='300'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
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
