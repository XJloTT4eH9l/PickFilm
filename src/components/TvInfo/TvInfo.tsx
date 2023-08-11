import { FC, useState, useEffect } from 'react';
import { BASE_POSTER } from '../../constants/api';
import { ITvDetail } from '../../types/types';

import db from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { IFavMovie } from '../../types/types';
import { onSnapshot, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';

import posterPlaceholder from '../../assets/img/movie-placeholder.png';
import star from '../../assets/img/star.png';
import done from '../../assets/img/done.png';

import Cast from '../Cast/Cast';
import Trailer from '../Trailer/Trailer';
import LinkBack from '../Ui/LinkBack/LinkBack';
import Spinner from '../Ui/Spinner/Spinner';

interface TvInfoProps {
    tvInfo: ITvDetail
}

const TvInfo:FC<TvInfoProps> = ({ tvInfo }) => {
    const { isAuth, email } = useAuth();
    const [seriesInFav, setSeriesInFav] = useState<IFavMovie | null>();
    const [loading, setLoading] = useState<boolean>(false); 
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


    const addToWatchList = async () => {
        try {
            setLoading(true);
            const collectionRef = collection(db, 'favSeries');
            const payload = {
                movieId: id,
                title: name,
                posterPath,
                userEmail: email 
            }
            await addDoc(collectionRef, payload);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const removeFromWatchList = async () => {
        if(seriesInFav) {
            try {
                setLoading(true);
                const docRef = doc(db, 'favSeries', seriesInFav.id);
                await deleteDoc(docRef)
                setSeriesInFav(null);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        const filmsCollection = collection(db, 'favSeries');
        if(isAuth) {
            try {
                onSnapshot(filmsCollection, (snapshot) => {
                    const movies: IFavMovie[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data() as Omit<IFavMovie, 'id'>,
                    }));
                    const inFav = movies.find(movie => movie.movieId === id && movie.userEmail === email);
                    if(inFav) {
                        setSeriesInFav(inFav);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }, [])
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
                        {isAuth && (
                            loading ? <Spinner /> : (
                                <button
                                    className={seriesInFav ? 'film-info__btn film-info__btn--active' : 'film-info__btn'}
                                    onClick={seriesInFav ? removeFromWatchList : addToWatchList}
                                >
                                    {seriesInFav 
                                        ? <p><img src={done} alt='remove'/>In watchlist</p> 
                                        : <p>Add to watchlist</p>
                                    }
                                </button>
                            )
                        )}
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