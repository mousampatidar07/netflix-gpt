import React, { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults, clearGptResults } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const SearchMovieTMDB = async (movie)=>{
     const data = await fetch('https://api.themoviedb.org/3/search/movie?query'
      +movie+
      '&include_adult=false&language=en-US&page=1',
       API_OPTIONS);

      //  const data = await fetch('https://api.themoviedb.org/3/search/movie?query=andaz%20apna%20apna&include_adult=false&language=en-US&page=1',
      //  API_OPTIONS);
       const json = await data.json();

      return json.results;
  }

  const handleGptSearchClick = async () => {
     dispatch(clearGptResults());
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me the name of 5 movies, comma separated like the example results given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const gptResults = await openai.chat.completions.create({
        model: "gpt-5.5",
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });

      console.log(gptResults.choices);
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        
      const promiseArray = gptMovies.map((movie) => SearchMovieTMDB(movie)); 

      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);

      dispatch(addGptMovieResults({movieNames: gptMovies , movieResults:tmdbResults}));

    } catch (error) {
  console.error("OpenAI Error:", error);

  dispatch(
    addGptMovieResults({
      movieNames: ["No Response From Suggestion System"],
      movieResults: [[]],
    })
  );

  if (error.status === 429) {
    alert("Please check your plan and billing details.");
  } else if (error.status === 401) {
    alert("Invalid OpenAI API key.");
  } else {
    alert("Something went wrong. Please try again.");
  }
}
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="What would you like to watch today"
        />

        <button
          className="py-2 px-4 bg-red-700 col-span-3 m-4 rounded-lg"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;