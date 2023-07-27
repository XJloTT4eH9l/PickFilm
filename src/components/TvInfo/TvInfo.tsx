import { FC } from 'react';
import { BASE_POSTER } from '../../constants/api';
import { ITvDetail } from '../../types/types';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import { addTV, removeTV } from '../../store/watchListSlice';

import posterPlaceholder from '../../assets/img/movie-placeholder.png';
import star from '../../assets/img/star.png';
import done from '../../assets/img/done.png';

import Cast from '../Cast/Cast';
import Trailer from '../Trailer/Trailer';
import LinkBack from '../Ui/LinkBack/LinkBack';

interface TvInfoProps {
    tvInfo: ITvDetail
}

const TvInfo:FC<TvInfoProps> = ({ tvInfo }) => {
    const dispatch = useAppDispatch();
    const tvs = useAppSelector(state => state.watchList.tvs);
    const {
        id,
        name,
        originalName,
        overview,
        releaseDate,
        lastDate,
        voteAverage,
        posterPath,
        backdropPath,
        tagline,
        genres,
        numberOfSeasons,
        numberOfEpisodes,
        inProduction,
    } = tvInfo;

    const tvInState = tvs.find(tv => tv.id === id);

    const addToWatchList = () => {
        dispatch(addTV({id, posterPath, title:name}))
    }

    const removeFromWatchList = () => {
        dispatch(removeTV({id, posterPath, title:name}))
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
                                ? <img className='film-info__poster' src={posterPlaceholder} alt={name} />
                                : <img className='film-info__poster' src={BASE_POSTER + posterPath} alt={name} />
                        }
                    </div>
                    <div className="film-info__right">
                        <h1 className='film-info__title'>{name}</h1>
                        <h2 className='film-info__subtitle'>{originalName}</h2>
                        <div className="film-info__rating">
                            <img className='film-info__star' src={star} alt='rating' />
                            <p>{voteAverage.toFixed(1)} / 10</p>
                        </div>
                        <p className="film-info__date">{releaseDate.split('-')[0]}</p>
                        <button
                            className={tvInState ? 'film-info__btn film-info__btn--active' : 'film-info__btn'}
                            onClick={tvInState ? removeFromWatchList : addToWatchList}
                        >
                            {tvInState 
                                ? <p><img src={done} alt='remove'/>In watchlist</p> 
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
                        <Cast id={id} type='tv' />       
                    </div>
                </div>
                <Trailer id={id} type='tv' />
            </div>
        </div>
    )
}

export default TvInfo;