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
import star from '../../assets/img/star.png';
import done from '../../assets/img/done.png';
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
                        <div className="film-info__rating">
                            <img className='film-info__star' src={star} alt='rating' />
                            <p>{voteAverage.toFixed(1)} / 10</p>
                        </div>
                        <p className="film-info__date">{releaseDate.split('-')[0]}</p>
                        <button
                            className={movieInState ? 'film-info__btn film-info__btn--active' : 'film-info__btn'}
                            onClick={movieInState ? removeFromWatchList : addToWatchList}
                        >
                            {movieInState 
                                ? (
                                    <p><img src={done} alt='remove'/>In watchlist</p>
                                ) 
                                : <p>Add to watchlist</p>
                            }
                        </button>
                        <ul className="film-info__genre-list">
                            {genres.map(genre => (
                                <li className='film-info__genre' key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                         <div className="film-info__overview">
                            <p className="film-info__overwiev">{overview}</p>
                        </div>
                        <Cast id={id} type='film' />       
                    </div>
                </div>
                <Trailer id={id} type='film' />
            </div>
        </div>
    )
}

export default FilmInfo