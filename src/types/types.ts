export interface IGenre {
    id: number;
    name: string;
}

export interface IFilm {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    voteAverage: number;
    posterPath: string;
    genres: string[];
}

export interface IFilmDetail  {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    voteAverage: number;
    posterPath: string;
    genres: IGenre[];
    originalTitle: string;
    backDropPath: string;
    runTime: number;
    tagline: string;
    budget: number;
}