import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail";
import UnderConstruction from "./components/UnderConstruction";

/**
 * Componente principal de la aplicación.
 * Administra las rutas y la obtención de datos de la API de Rick and Morty.
 * @returns {JSX.Element} Estructura de la aplicación con navegación y manejo de estados.
 */
function App() {
  // Estado para almacenar la lista de personajes obtenidos de la API
  const [characters, setCharacters] = useState([]);

  /**
   * useEffect que se ejecuta una vez al montar el componente.
   * Se encarga de obtener todos los personajes de la API de Rick and Morty.
   */
  useEffect(() => {
    /**
     * Función asincrónica que obtiene todos los personajes de la API paginada.
     * Utiliza un bucle `while` para recorrer todas las páginas disponibles.
     */
    const fetchAllCharacters = async () => {
      try {
        let allData = []; // Array para almacenar todos los personajes
        let page = 1; // Página inicial
        let totalPages = 1; // Total de páginas (se actualizará después de la primera solicitud)

        while (page <= totalPages) {
          try {
            // Realiza la solicitud a la API con la página actual
            const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            
            if (!res.ok) {
              console.warn(`Error en página ${page}, continuando...`);
              page++;
              continue;
            }
            
            const data = await res.json();

            // Agrega los personajes de la página actual al array
            allData = [...allData, ...data.results];

            // Actualiza el total de páginas con el valor de la API
            totalPages = data.info.pages;
            page++; // Avanza a la siguiente página
          } catch (pageError) {
            console.warn(`Error fetching page ${page}:`, pageError);
            page++; // Continúa con la siguiente página aunque falle una
            if (page > 50) break; // Límite de seguridad
          }
        }

        // Almacena todos los personajes en el estado
        setCharacters(allData);
        console.log(`Total de personajes cargados: ${allData.length}`);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchAllCharacters();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Página principal que muestra la lista de personajes */}
          <Route path="/" element={<Home characters={characters} />} />
          
          {/* Página de detalles de un personaje */}
          <Route path="/character/:id" element={<CharacterDetail />} />
          
          {/* Secciones en construcción */}
          <Route path="/episodes" element={<UnderConstruction />} />
          <Route path="/locations" element={<UnderConstruction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
