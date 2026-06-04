import { useLocation } from "react-router-dom"; // Hook para obtener la ruta actual
import "../stylesheets/UnderConstruction.css"; // Importa los estilos específicos
import constructionImage from "../assets/fondo.jpg"; // Imagen de la página en construcción

function UnderConstruction() {
  const location = useLocation(); // Obtiene la ubicación actual del usuario

  // Diccionario para mostrar títulos personalizados según la ruta
  const titles = {
    "/episodes": "Episodes",
    "/locations": "Locations",
  };

  return (
    <div className="construction-container">
      {/* Muestra el título según la ruta actual o un valor por defecto */}
      <h2 className="app-subtitle">{titles[location.pathname] || "Page"}</h2>
      
      <div className="construction-content">
        <p>
          Wubba Lubba Dub Dub!  
          It looks like the page you're trying to access is still under construction.  
          Maybe it's lost in another dimension! Try again later, or ask Rick to fix it...  
          if he's not too busy with science stuff!
        </p>
        
        {/* Imagen de la página en construcción */}
        <img src={constructionImage} alt="Página en construcción" className="construction-image" />
      </div>
    </div>
  );
}  

export default UnderConstruction;
