import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import CharacterDetail from "./pages/CharacterDetail";
import UnderConstruction from "./components/UnderConstruction";

/**
 * Componente principal de la aplicación.
 * Administra las rutas de la aplicación.
 * La carga de datos ahora se maneja en cada página según sea necesario.
 * @returns {JSX.Element} Estructura de la aplicación con navegación.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Página principal que muestra la lista de personajes */}
          <Route path="/" element={<Home />} />
          
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
