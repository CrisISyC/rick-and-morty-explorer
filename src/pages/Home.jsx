import { useState, useEffect } from "react";
import Characters from "../components/Character";
import "../stylesheets/Home.css"

function Home({ characters }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
    setCurrentPage(1);
  }, [searchTerm, characters]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    setPaginatedCharacters(filteredCharacters.slice(startIndex, endIndex));
  }, [currentPage, filteredCharacters]);

  return (
    <div className="principal-container">
      <div className="app-title-container">
        <h1 className="app-title">The Rick and Morty App</h1>
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
        <p>{filteredCharacters.length} results found</p>
      </div>
      <Characters characters={paginatedCharacters} />
      <div className="pagination">
        <button
          className="button-pagination"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Before
        </button>
        <span className="span-pagination">
          Page {currentPage} of {Math.ceil(filteredCharacters.length / 20)}
        </span>
        <button
          className="button-pagination"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= Math.ceil(filteredCharacters.length / 20)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
