import React from "react";
import { Link } from "react-router-dom";

// Dit is de MovieList component die een lijst van films toont.
const MovieList = (props) => {
  const AddWatchlist = props.AddWatchlist;

  return (
    <>
      {/* Hier map ik over de lijst van films uit de doorgestuurde props.*/}
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start movie-thumb">
          {/* Hier gebruik ik de 'Link' van 'react-router' om een klikbare link naar de detailpagina van de film te maken. */}
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt="movie-thumb"></img>
          </Link>

          {/* Wanneer op deze div geklikt wordt, voegt het de film toe aan de kijklijst. */}
          <div
            onClick={() => props.handleWatchlistClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <AddWatchlist />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
