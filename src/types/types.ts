export interface IGenre {
    id: number;
    name: string;
}

export interface IFilmShort {
    id: number;
    title: string;
    poster_path: string;
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
    originalTitle: string;
    overview: string;
    releaseDate: string;
    voteAverage: number;
    posterPath: string;
    backdropPath: string;
    genres: IGenre[];
    runTime: number;
    tagline: string;
    budget: number;
}

export interface ISeasons {
    id: number;
    episodeCount: number;
    name: string;
    overview: string;
    posterPath: string;
    seasonNumber: number;
}

export interface ITvDetail {
    id: number;
    name: string;
    originalName: string;
    overview: string;
    releaseDate: string;
    lastDate: string;
    voteAverage: number;
    posterPath: string;
    backdropPath: string;
    tagline: string;
    genres: IGenre[];
    numberOfSeasons: number;
    numberOfEpisodes: number;
    inProduction: boolean;
}

export interface IMovie {
    id: number;
    title: string;
    posterPath: string;
}