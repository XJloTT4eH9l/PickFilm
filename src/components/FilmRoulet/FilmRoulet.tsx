import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_GENRES, API_DISCOVER, BASE_POSTER } from '../../constants/api';
import { IGenre, IFilm } from '../../types/types';
import { genresParser } from '../../utils/genresParser';

import DropDown from '../Ui/DropDown/DropDown';
import Btn from '../Ui/Btn/Btn';

import './FilmRoulet.scss';

const FilmRoulet = () => {
    const [film, setFilm] = useState<IFilm>();
    const [currentGenre, setCurrentGenre] = useState<IGenre>({ id: 18, name:'Drama' })
    const [rating, setRating] = useState<IGenre>({ id: 1, name: 'Any rating' });
    const [genres, setGenres] = useState<IGenre[]>([]);

    const ratings = [
        {id: 1, name: 'Any rating'},
        {id: 2, name: '>6'},
        {id: 3, name: '>7'},
        {id: 5, name: '>8'},
        
    ];

    const getTmdbGenres = async (link: string) => {
        const data = await axios.get(link);
        
        setGenres(data.data.genres);
        console.log(data);
    }

    const getRandomFilm = async () => {
        const page = `&page=1`;
        const genre = `&with_genres=${currentGenre.id}`;
        const score = `&vote_average.gte=${rating.id === 1 ? 1 : rating.name[1]}`;

        const data = await axios.get(API_DISCOVER + page + score + genre);

        const limit = data.data.results.length;
        const randomFilmNumber = Math.floor(Math.random() * limit) + 1;
        const randomFilm = data.data.results[randomFilmNumber];
        const genresParsed = genresParser(randomFilm.genre_ids);
        console.log(genresParsed);

        const filmRes: IFilm = {
            id : randomFilm.id,
            title: randomFilm.title,
            overview: randomFilm.overview,
            releaseDate: randomFilm.release_date,
            voteAverage: randomFilm.vote_average,
            posterPath: randomFilm.poster_path,
            genres: genresParsed
        }

        setFilm(filmRes);
        console.log(randomFilm);
    }

    useEffect(() => {
        getTmdbGenres(API_GENRES);
    }, [])
    return (
        <div className='roulet'>
            <div className="roulet__left">
                <div className="roulet__field">
                    <p className="roulet__title">Genre</p>
                    <DropDown 
                        items={genres}
                        currentItem={currentGenre}
                        setCurrentItem={setCurrentGenre}
                    />
                </div>
                <div className="roulet__field">
                    <p className="roulet__title">Rating</p>
                    <DropDown 
                        items={ratings}
                        currentItem={rating}
                        setCurrentItem={setRating}
                    />
                </div>
                <Btn
                    name='Spin'
                    btnHandler={getRandomFilm}
                    classes={'btn btn--primary btn--wide'} 
                />
            </div>
            <div className="roulet__right">
                {
                     film ? (
                        <div className="film">
                            <img className='film__poster' src={BASE_POSTER + film.posterPath} alt={film.title} />
                            <div className="film__content">
                                <h2 className="film__title">{film.title}</h2>
                                <div className="film__row">
                                    <p className="film__year">{film.releaseDate.split('-')[0]}</p>
                                    <p className="film__rating">Rating: {film.voteAverage}</p>
                                    <ul className="film__genres">
                                        {film.genres.map((genre, index) => (
                                            <li key={genre}>{genre}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="film__overview">{film.overview}</p>
                            </div>
                        </div>
                    ) :  <h2 className='roulet__heading'>Press Spin to get film</h2>
                }
            </div>
        </div>
    )
}

export default FilmRoulet