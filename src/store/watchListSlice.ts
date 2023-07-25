import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../types/types';

type watchListState = {
  movies: IMovie[],
  tvs: IMovie[]
}

const tempMovies = localStorage.getItem('movies');
const moviesState = tempMovies ? JSON.parse(tempMovies) : [];

const tempTvs = localStorage.getItem('tvs');
const tvsState = tempTvs? JSON.parse(tempTvs) : [];

const initialState: watchListState = {
    movies: moviesState,
    tvs: tvsState
  }

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    addMovie(state, action: PayloadAction<IMovie>) {
      state.movies.push({
        id: action.payload.id,
        posterPath: action.payload.posterPath,
        title: action.payload.title
      })
      localStorage.setItem('movies', JSON.stringify(state.movies));
    },
    removeMovie(state, action: PayloadAction<IMovie>) {
     state.movies = state.movies.filter(movie => movie.id !== action.payload.id);
     localStorage.setItem('movies', JSON.stringify(state.movies));
    },
    addTV(state, action: PayloadAction<IMovie>) {
      state.tvs.push({
        id: action.payload.id,
        posterPath: action.payload.posterPath,
        title: action.payload.title
      })
      localStorage.setItem('tvs', JSON.stringify(state.tvs));
    },
    removeTV(state, action: PayloadAction<IMovie>) {
     state.tvs = state.tvs.filter(tv => tv.id !== action.payload.id);
     localStorage.setItem('tvs', JSON.stringify(state.tvs));
    }
  }
});

export const { addMovie, removeMovie, addTV, removeTV } = watchListSlice.actions;

export default watchListSlice.reducer;