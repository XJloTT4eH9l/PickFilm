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