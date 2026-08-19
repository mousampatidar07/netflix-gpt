import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
  return (
    <div className='bg-black'>
    <div className=' -mt-52 pl-2 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies?.NowPlayingMovies} />
      <MovieList title={"Tranding"} movies={movies?.addTrandingMovies} />
      <MovieList title={"Popular"} movies={movies?.addPopularMovies} />
      <MovieList title={"Up Coming"} movies={movies?.addUpcomingMovies} />

    </div>
    </div>
  )
}

export default SecondaryContainer
