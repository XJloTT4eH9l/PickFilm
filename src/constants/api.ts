export const BASE_URL: string = 'https://api.themoviedb.org/3';
export const BASE_POSTER: string = 'https://image.tmdb.org/t/p/w500';
export const API_KEY: string = '?api_key=5f40afa5147b3c7117b17a225eb970c5';

const GENRES = '/genre/movie/list';
const GENRES_TV = '/genre/tv/list';

const DISCOVER_MOVIE = '/discover/movie';
const DISCOVER_TV = '/discover/tv';

const MOVIE = '/movie';
const TV = '/tv';

const SEARCH_MOVIE = '/search/movie';

export const API_GENRES: string = BASE_URL + GENRES + API_KEY + '&language=en-US';
export const API_GENRES_TV: string = BASE_URL + GENRES_TV + API_KEY + '&language=en-US';
export const API_MOVIE: string =  BASE_URL + MOVIE;
export const API_TV: string = BASE_URL + TV;
export const API_SEARCH_MOVIE: string = BASE_URL + SEARCH_MOVIE + API_KEY + '&language=en-US';
export const API_DISCOVER_FILM: string = BASE_URL + DISCOVER_MOVIE + API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
export const API_DISCOVER_TV: string = BASE_URL + DISCOVER_TV + API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';
