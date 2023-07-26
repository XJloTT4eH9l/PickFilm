import { FC } from 'react';
import { BASE_POSTER } from '../../constants/api';
import { IFilmDetail } from '../../types/types';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import { addMovie, removeMovie } from '../../store/watchListSlice';

import Cast from '../Cast/Cast';
import Trailer from '../Trailer/Trailer';
import LinkBack from '../Ui/LinkBack/LinkBack';

import posterPlaceholder from '../../assets/img/movie-placeholder.png';
import './FilmInfo.scss';

interface FilmInfoProps {
    filmInfo: IFilmDetail
}

const FilmInfo: FC<FilmInfoProps> = ({ filmInfo }) => {
    const dispatch = useAppDispatch();
    const films = useAppSelector(state => state.watchList.movies);
    const {
        id,
        title,
        originalTitle,
        posterPath,
        backdropPath,
        overview,
        releaseDate,
        voteAverage,
        genres,
        runTime,
        tagline,
        budget
    } = filmInfo;
    const movieInState = films.find(movie => movie.id === id);

    const addToWatchList = () => {
        dispatch(addMovie({ id, posterPath, title }))
    }

    const removeFromWatchList = () => {
        dispatch(removeMovie({ id, posterPath, title }))
    }

    return (
        <div className='film-info'>
            <div
                className='film-info__background'
                style={{ backgroundImage: `url(${backdropPath ? BASE_POSTER + backdropPath : BASE_POSTER + posterPath})` }}
            />
            <div className="film-info__container">
                <LinkBack />
                <div className="film-info__inner">
                    <div className="film-info__left">
                        {
                            posterPath === null
                                ? <img className='film-info__poster' src={posterPlaceholder} alt={title} />
                                : <img className='film-info__poster' src={BASE_POSTER + posterPath} alt={title} />
                        }
                    </div>
                    <div className="film-info__right">
                        <h1 className='film-info__title'>{title}</h1>
                        <h2 className='film-info__subtitle'>{originalTitle}</h2>
                        <ul className="film-info__genre-list">
                            {genres.map(genre => (
                                <li className='film-info__genre' key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                         <div className="film-info__overview">
                            <p className="film-info__overwiev">{overview}</p>
                        </div>
                        <Cast id={id} />       
                    </div>
                </div>
                <Trailer id={id} />
                {/* <button
                    className={movieInState ? 'film-info__btn film-info__btn--active' : 'film-info__btn'}
                    onClick={movieInState ? removeFromWatchList : addToWatchList}
                >
                    {movieInState ? 'Remove from watchlist' : 'Add to watchlist'}
                </button> */}
            </div>
        </div>
    )
}

export default FilmInfo



{/* <div className="film-info__details">
                        <div className='film-info__detail'>
                            <p className="film-info__text">Rating:</p>
                            <p className="film-info__field">{voteAverage}</p>
                        </div>
                        <div className='film-info__detail'>
                            <p className="film-info__text">Year:</p>
                            <p className="film-info__field">{releaseDate.split('-')[0]}</p>
                        </div>
                        <div className='film-info__detail'>
                            <p className="film-info__text">Genre:</p>
                            <ul className="film-info__field">
                                {genres.map(genre => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='film-info__detail'>
                            <p className="film-info__text">Runtime:</p>
                            <p className="film-info__field">{runTime} min</p>
                        </div>
                        {budget > 0 && (
                            <div className='film-info__detail'>
                                <p className="film-info__text">Budget:</p>
                                <p className="film-info__field">{budget} $</p>
                            </div>
                        )}
                        {tagline && (
                            <div className='film-info__detail tagline'>
                                <p className="film-info__text">Tagline:</p>
                                <p className="film-info__field">{tagline}</p>
                            </div>
                        )}
                    </div> */}