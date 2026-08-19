import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice =  createSlice({
    name:"movies",
    initialState:{
        NowPlayingMovies: null,
        TrailerVideo:null
    },
    reducers:{
        addNowPlayingMovies: (state , action)=>{
           state.NowPlayingMovies = action.payload;
        },
        addPopularMovies: (state , action)=>{
           state.addPopularMovies = action.payload;
        },
         addUpcomingMovies: (state , action)=>{
           state.addUpcomingMovies = action.payload;
        },
          addTrandingMovies: (state , action)=>{
           state.addTrandingMovies = action.payload;
        },
        addTrailerVideo:(state , action)=>{
            state.TrailerVideo = action.payload;
        },

    }
});

export const {addNowPlayingMovies  , addTrailerVideo , addPopularMovies , addUpcomingMovies , addTrandingMovies} = moviesSlice.actions;

export default moviesSlice.reducer;