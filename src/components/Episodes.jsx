import React from "react";


function Episodes({ episodes }) {
  return (
    <div className="episodes-container">
      {episodes.map((episode) => (
        <div key={episode.id} className="episode-container">
          <p className="name">{episode.name}</p>
          <p className="episode">{episode.episode}</p>
          <p className="air-date">{episode.air_date}</p>
        </div>
      ))}
    </div>
  );
}

export default Episodes;