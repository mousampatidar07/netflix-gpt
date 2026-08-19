import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {  addTrandingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrandingMovies = () =>{
      const dispatch = useDispatch();

  const getTrandingMovies = async () =>{
     const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS
    );
    const json = await data.json();
  
    dispatch(addTrandingMovies(json.results));
  };

  useEffect(()=>{
getTrandingMovies();
  },[])
}

export default useTrandingMovies;
