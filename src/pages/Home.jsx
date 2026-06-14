import { useState, useEffect } from "react";
import Characters from "../components/Character";
import "../stylesheets/Home.css"

function Home() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Función para obtener personajes de la API
   * Soporta búsqueda por nombre y paginación
   */
  const fetchCharacters = async (page, search = "") => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `https://rickandmortyapi.com/api/character?page=${page}`;
      if (search) {
        url += `&name=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 404) {
          setCharacters([]);
          setTotalPages(0);
          setTotalCharacters(0);
          setError("No se encontraron personajes");
          return;
        }
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setTotalCharacters(data.info.count);
      
    } catch (err) {
      console.error("Error fetching characters:", err);
      setError(err.message || "Error al cargar personajes");
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar personajes cuando cambia la página
  useEffect(() => {
    fetchCharacters(currentPage, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Manejar búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Resetear a página 1 al buscar
      fetchCharacters(1, searchTerm);
    }, 500); // Esperar 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="principal-container">
      <div className="app-title-container">
        <h1 className="app-title">Rick and Morty Explorer</h1>
      </div>
      <div className="app-subtitle-container">
        <h2 className="app-subtitle">Characters</h2>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search character..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="results-count">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <p>{totalCharacters} results found</p>
        )}
      </div>
      
      {!loading && !error && <Characters characters={characters} />}
      
      {!loading && !error && totalPages > 0 && (
        <div className="pagination">
          <button
            className="button-pagination"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Before
          </button>
          <span className="span-pagination">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="button-pagination"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
