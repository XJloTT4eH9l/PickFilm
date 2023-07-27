import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { API_GENRES, API_DISCOVER_FILM, API_GENRES_TV, API_DISCOVER_TV, BASE_POSTER } from '../../constants/api';
import { IGenre, IFilm } from '../../types/types';
import { genresParser } from '../../utils/genresParser';

import DropDown from '../Ui/DropDown/DropDown';
import RadioBtn from '../Ui/RadioBtn/RadioBtn';
import Btn from '../Ui/Btn/Btn';
import Spinner from '../Ui/Spinner/Spinner';

import './FilmRoulet.scss';

const FilmRoulet = () => {
    const rouletFilm = sessionStorage.getItem('rouletFilm');
    const rouletFilmState = rouletFilm ? JSON.parse(rouletFilm) : null;
    const [type, setType] = useState<string>('Movie');
    const [film, setFilm] = useState<IFilm>(rouletFilmState);
    const [loading, setLoading] = useState<boolean>(false);

    const [currentGenre, setCurrentGenre] = useState<IGenre>({ id: 18, name:'Drama' })
    const [rating, setRating] = useState<IGenre>({ id: 1, name: 'Any rating' });

    const [genres, setGenres] = useState<IGenre[]>([]);
    const [genresTV, setGenresTV] = useState<IGenre[]>([]);


    const ratings = [
        {id: 1, name: 'Any rating'},
        {id: 2, name: '>6'},
        {id: 3, name: '>7'},
        {id: 5, name: '>8'},
    ];

    const getTmdbGenres = async () => {
        try {
            const responceMovie = await axios.get(API_GENRES);
            const responceTV = await axios.get(API_GENRES_TV);

            setGenres(responceMovie.data.genres);
            setGenresTV(responceTV.data.genres);

        } catch (error) {
            alert(error);
        }
    }

    const getRandomFilm = async () => {
        try {
            setLoading(true);
            const page = `&page=${Math.floor(Math.random() * 10) + 1}`;
            const genre = `&with_genres=${currentGenre.id}`;
            const score = `&vote_average.gte=${rating.id === 1 ? 1 : rating.name[1]}`;

            const data = await axios.get(API_DISCOVER_FILM + page + score + genre);

            if(data.status !== 200) {
                throw new Error(`${data.status}: ${data.statusText}`)
            }

            const limit = data.data.results.length;
            const randomFilmNumber = Math.floor(Math.random() * limit) + 1;
            const randomFilm = data.data.results[randomFilmNumber];
            const overview = randomFilm.overview.length > 250 
                ? randomFilm.overview.slice(0, 250) + '...'
                : randomFilm.overview;
            const genresParsed = genresParser(randomFilm.genre_ids);
            const genres = [genresParsed[0], genresParsed[1]];
            
            const filmRes: IFilm = {
                id : randomFilm.id,
                title: randomFilm.title,
                overview: overview,
                releaseDate: randomFilm.release_date,
                voteAverage: randomFilm.vote_average,
                posterPath: randomFilm.poster_path,
                genres: genresParsed.length > 2 ? genres : genresParsed
            }

            setFilm(filmRes);
            sessionStorage.setItem('rouletFilm', JSON.stringify(filmRes));

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const getRandomTV = async () => {
        try {
            setLoading(true);
            const page = `&page=1`;
            const genre = `&with_genres=${currentGenre.id}`;
            const score = `&vote_average.gte=${rating.id === 1 ? 1 : rating.name[1]}`;

            const data = await axios.get(API_DISCOVER_TV + page + score + genre);

            if(data.status !== 200) {
                throw new Error(`${data.status}: ${data.statusText}`)
            }

            const limit = data.data.results.length;
            const randomFilmNumber = Math.floor(Math.random() * limit) + 1;
            const randomFilm = data.data.results[randomFilmNumber];
            const overview = randomFilm.overview.length > 250 
                ? randomFilm.overview.slice(0, 250) + '...'
                : randomFilm.overview;
            const genresParsed = genresParser(randomFilm.genre_ids);
            const genres = [genresParsed[0], genresParsed[1]];
            
            const filmRes: IFilm = {
                id : randomFilm.id,
                title: randomFilm.original_name,
                overview: overview,
                releaseDate: randomFilm.first_air_date,
                voteAverage: randomFilm.vote_average,
                posterPath: randomFilm.poster_path,
                genres: genresParsed.length > 2 ? genres : genresParsed
            }

            setFilm(filmRes);
            sessionStorage.setItem('rouletFilm', JSON.stringify(filmRes));

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        setCurrentGenre({ id: 18, name:'Drama' });
    }, [type])

    useEffect(() => {
        getTmdbGenres();
    }, [])
    return (
        <div className='roulet'>
            <div className="roulet__left">
                <div className="roulet__field">
                    <p className="roulet__title">Type</p>
                    <div className="roulet__radio-container">
                        <RadioBtn
                            id='Movie'
                            type={type}
                            setType={setType} 
                        />
                        <RadioBtn
                            id='TV'
                            type={type}
                            setType={setType} 
                        />
                    </div>
                </div>
                <div className="roulet__field">
                    <p className="roulet__title">Genre</p>
                    <DropDown 
                        items={type === 'TV' ? genresTV : genres}
                        currentItem={currentGenre}
                        setCurrentItem={setCurrentGenre}
                        classes='drop-down__content--genres'
                    />
                </div>
                <div className="roulet__field">
                    <p className="roulet__title">Rating</p>
                    <DropDown 
                        items={ratings}
                        currentItem={rating}
                        setCurrentItem={setRating}
                        classes='drop-down__content--rating'
                    />
                </div>
                <Btn
                    name='Spin'
                    btnHandler={type === 'Movie' ? getRandomFilm : getRandomTV}
                    classes={'btn btn--primary btn--wide'} 
                />
            </div>
            <div className="roulet__right">
                { 
                    loading ? <Spinner /> : (
                        film && film.releaseDate.length > 0 ? (
                            <div className="film">
                                <img className='film__poster' src={BASE_POSTER + film.posterPath} alt={film.title} />
                                <div className="film__content">
                                    <h2 className="film__title">
                                        <Link 
                                            to={type === 'Movie' ? `/movies/${film.id}` : `/tv/${film.id}`}
                                        >
                                            {film.title}
                                        </Link>
                                    </h2>
                                    <div className="film__row">
                                        <p className="film__year">{film.releaseDate.split('-')[0]}</p>
                                        <p className="film__rating">Rating: {film.voteAverage}</p>
                                        <ul className="film__genres">
                                            {film.genres.map((genre) => (
                                                <li className='film__genre' key={genre}>{genre}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="film__overview">{film.overview}</p>
                                    <p className="film__ads">* To get more details about film click on film title</p>
                                </div>
                            </div>
                        ) :  <h2 className='roulet__heading'>Press Spin to get film</h2>
                    )
                }
            </div>
        </div>
    )
}

export default FilmRoulet