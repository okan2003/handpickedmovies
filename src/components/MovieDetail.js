import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MovieDetail = () => {
  // Haalt de 'id' parameter uit de URL met gebruik van 'useParams' van 'react-router'.
  const { id } = useParams();

  // Initialiseren van de staat voor de film details.
  const [movieDetails, setMovieDetails] = useState(null);

  // Hier haal ik de 'navigate' functie op.
  const navigate = useNavigate();

  // Deze functie stuurt de gebruiker terug naar de hoofdpagina (voor de terug knop).
  const handleBackClick = () => {
    navigate("/");
  };

  // De useEffect hook wordt gebruikt om een API-oproep uit te voeren.
  useEffect(() => {
    // Hier maak ik een netwerkverzoek om de film details op te halen met het gegeven 'id'.
    fetch(`http://www.omdbapi.com/?apikey=d710624a&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update de 'movieDetails' staat met de opgehaalde gegevens.
        setMovieDetails(data);
      })
      .catch((error) => console.error("Er is een fout opgetreden:", error)); // Log eventuele fouten naar de console.
  }, [id]); // Deze hook wordt opnieuw uitgevoerd wanneer de waarde van 'id' verandert.

  return (
    <div className="container mt-5 mb-5">
      {movieDetails ? (
        <div className="card bg-transparent">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={movieDetails.Poster}
                alt={`${movieDetails.Title} Poster`}
                className="card-img"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title text-light">{movieDetails.Title}</h1>
                <p className="card-text text-light">
                  Jaar: {movieDetails.Year}
                </p>
                <p className="card-text text-light">
                  Genre: {movieDetails.Genre}
                </p>
                <p className="card-text text-light">
                  Regisseur: {movieDetails.Director}
                </p>
                <button
                  className="btn btn-danger text-uppercase"
                  onClick={handleBackClick}
                >
                  Terug
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
