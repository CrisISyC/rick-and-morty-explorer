# Rick and Morty Explorer

## Introducción
Aplicación web desarrollada con React que permite explorar el universo de "Rick and Morty", proporcionando detalles sobre los personajes de la serie.

## Creación de la Aplicación

### Paso 1: Configuración Inicial
La aplicación fue creada utilizando `create-react-app`, que proporciona una estructura de proyecto lista para usar. Se utilizó el siguiente comando para iniciar el proyecto:

```sh
npx create-react-app rick-and-morty-api
```

### Paso 2: Instalación de Dependencias
Se instalaron las dependencias necesarias para manejar las rutas dentro de la aplicación:

```sh
npm install react-router-dom
```

### Paso 3: Estructura del Proyecto
La estructura general del proyecto es la siguiente:

```
rick-and-morty-api/
├── src/
│   ├── assets/
│   │   ├── fondo.jpg
│   │   └── logo.png
│   ├── components/
│   │   ├── Characterjsx
│   │   ├── Episodes.jsx
│   │   ├── Header.jsx
│   │   └── UnderConstruction.jsx
│   ├── pages/
│   │   ├── CharacterDetail.jsx
│   │   └── Home.jsx
│   ├── stylesheets/
│   │   ├── Character.css
│   │   ├── CharacterDetail.css
│   │   ├── Header.css
│   │   ├── Home.css
│   │   └── UnderConstruction.css
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── public/
├── package.json
└── README.md
```

## Desafíos Encontrados

### Manejo de la paginación
Inicialmente, la API solo devolvía 20 personajes por página, lo que dificultaba la implementación de filtros y búsquedas globales. La solución fue realizar llamadas consecutivas para recuperar todos los personajes antes de aplicarlos en la interfaz.

### Refactorización de App.js

Conforme avanzaba el desarrollo, App.js comenzó a acumular demasiado código, lo que iba en contra de las buenas prácticas. Para mejorar la organización, se creó el componente Home.jsx, lo que implicó migrar varias funciones y estados de App.js a Home.jsx. Este proceso presentó desafíos al momento de gestionar correctamente la información y asegurarse de que los componentes siguieran funcionando de manera óptima.

### Configuración de rutas
Configurar `react-router-dom` fue un reto, especialmente al manejar la navegación entre la página principal y los detalles de cada personaje. Se resolvió asegurando que las rutas estuvieran bien definidas y que los datos correctos se pasaran a cada componente.

## Facilidades
Una de las facilidades fue el consumo de la API de "Rick and Morty", ya que tiene una documentación clara y bien estructurada. Esto permitió un desarrollo más rápido sin necesidad de realizar configuraciones complejas en el backend.

## Recursos
- [Documentación de React](https://react.dev/)
- [API de Rick and Morty](https://rickandmortyapi.com/)

