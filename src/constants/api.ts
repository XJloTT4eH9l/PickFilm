export const BASE_URL: string = 'https://api.themoviedb.org/3';
export const BASE_POSTER: string = 'https://image.tmdb.org/t/p/w500';
export const API_KEY: string = '?api_key=5f40afa5147b3c7117b17a225eb970c5';

const GENRES = '/genre/movie/list';
const DISCOVER = '/discover/movie'

export const API_GENRES: string = BASE_URL + GENRES + API_KEY + '&language=en-US';
export const API_DISCOVER: string = BASE_URL + DISCOVER + API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false';

// 'https://api.themoviedb.org/3/genre/movie/list?api_key=5f40afa5147b3c7117b17a225eb970c5&language=en-US'