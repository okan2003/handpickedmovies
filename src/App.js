import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ReactComponent as Logo } from "./logo-1.svg";
import MovieHeading from "./components/MovieHeading";
import MovieDetail from "./components/MovieDetail";
import Search from "./components/Search";
import AddWatchlist from "./components/AddWatchlist";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Hier maak ik een App component.
const App = () => {
  // Hier maak ik een lijst van films en een functie om deze lijst bij te werken.
  const [movies, setMovies] = useState([]);

  // Dit is de kijklijst, voor films die je later wilt bekijken.
  const [watchlist, setWatchlist] = useState([]);

  // Dit is de waarde die ik gebruik om films te zoeken. Standaard wordt er gezocht naar jurassic.
  const [searchValue, setSearchvalue] = useState("jurassic");

  // Elke keer als de 'searchValue' verandert, voert deze useEffect de logica binnen zijn callback uit.
  useEffect(() => {
    // Deze functie haalt de filmgegevens op van de API.
    const fetchMovies = async () => {
      // Dit is de website waar ik de filmgegevens vandaan haal.
      const url = `http://www.omdbapi.com/?apikey=d710624a&s=${searchValue}`;

      // Hier vraag ik de gegevens op van de website.
      const response = await fetch(url);

      // Ik zet het antwoord om naar een formaat dat leesbaar is.
      const responseJson = await response.json();

      // Als de website ons een lijst van films geeft, zet ik die in onze 'movies' lijst.
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    };

    // Nu roepen we de fetchMovies functie direct aan binnen de useEffect.
    fetchMovies();

    // Deze useEffect wordt opnieuw uitgevoerd wanneer 'searchValue' verandert.
  }, [searchValue]);

  // Dit is een functie die een film toevoegt aan de kijklijst.
  const AddWatchMovie = (movie) => {
    // Hier maak ik een nieuwe lijst die alle oude films bevat, plus de nieuwe film.
    const newWatchMovie = [...watchlist, movie];
    // Hier update ik de kijklijst met de nieuwe lijst van films.
    setWatchlist(newWatchMovie);
  };

  return (
    // De <Router> zorgt ervoor dat we verschillende 'pagina's' (of componenten) in onze applicatie kunnen weergeven
    // gebaseerd op het pad (URL) waar de gebruiker zich bevindt.
    <Router>
      {/*Dit is de hoofdcontainer van de app, waar al de onderdelen in zitten. */}
      <div className="container-fluid movies-app">
        {/* Dit is de kop van onze app, waar de logo en het zoekcomponent zitten. */}
        <header>
          <Logo />
          <Routes>
            {/* Hier zeggen we: "toon de zoekcomponent alleen op de hoofdpagina".
                 Dit betekent dat als iemand op de startpagina van onze website zit ze het zoekcomponent kunnen zien.
                Maar als ze op een andere pagina zitten zien ze het niet. */}
            <Route
              index
              element={
                <Search
                  searchValue={searchValue}
                  setSearchvalue={setSearchvalue}
                />
              }
            />
          </Routes>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                movies={movies}
                watchlist={watchlist}
                handleWatchlistClick={AddWatchMovie}
                AddWatchlist={AddWatchlist}
              />
            }
          />
          {/* Als iemand een  film wil zien, laten we de MovieDetail-component zien, waar je meer informatie over die film kunt vinden. */}
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
function HomePage({ movies, watchlist, handleWatchlistClick, AddWatchlist }) {
  return (
    <>
      {/* Dit is het gedeelte dat het kopje Films bovenaan de pagina toont. */}
      <div className="row mb-4 mt-4 d-flex align-items-center">
        <MovieHeading heading="Films" />
      </div>

      {/* Hier toon ik de lijst van films. */}
      <div className="row movie-list">
        <MovieList
          movies={movies}
          handleWatchlistClick={handleWatchlistClick}
          AddWatchlist={AddWatchlist}
        />
      </div>

      <div className="row mb-4 mt-4 d-flex align-items-center">
        <MovieHeading heading="Kijklijst" />
      </div>

      <div className="row movie-list">
        <MovieList
          movies={watchlist}
          handleWatchlistClick={handleWatchlistClick}
          AddWatchlist={AddWatchlist}
        />
      </div>
    </>
  );
}
