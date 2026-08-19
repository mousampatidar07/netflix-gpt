import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import NoResponse from "./NoResponse";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector(
    (store) => store.gpt
  );

 // Abhi koi search nahi hui
  if (!movieNames) {
    return null;
  }

  // Search hui but OpenAI ne response nahi diya
  if (movieNames.length === 0) {
    return <NoResponse />;
  }

  return (
    <div className="p-4 m-4 bg-black text-white">
      {movieNames.map((movieName, index) => {
        const movies = movieResults?.[index];

        // Agar particular movie ka TMDB result nahi mila
        if (!movies || movies.length === 0) {
          return (
            <NoResponse key={movieName} />
          );
        }

        return (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movies}
          />
        );
      })}
    </div>
  );
};

export default GptMovieSuggestions;