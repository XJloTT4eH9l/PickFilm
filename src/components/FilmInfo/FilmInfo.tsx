import { FC, useState, useEffect } from 'react';
import { BASE_POSTER } from '../../constants/api';
import { IFilmDetail } from '../../types/types';

import db from '../../firebase';
import { onSnapshot, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { IFavMovie } from '../../types/types';

import Cast from '../Cast/Cast';
import Trailer from '../Trailer/Trailer';
import LinkBack from '../Ui/LinkBack/LinkBack';
import Spinner from '../Ui/Spinner/Spinner';

import posterPlaceholder from '../../assets/img/movie-placeholder.png';
import star from '../../assets/img/star.png';
import done from '../../assets/img/done.png';
import './FilmInfo.scss';

interface FilmInfoProps {
    filmInfo: IFilmDetail
}

const FilmInfo: FC<FilmInfoProps> = ({ filmInfo }) => {
    const { isAuth, email } = useAuth();
    const [movieInFav, setMovieInFav] = useState<IFavMovie | null>();
    const [loading, setLoading] = useState<boolean>(false);
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
    } = filmInfo;

    const addToWatchList = async () => {
        try {
            setLoading(true);
            const collectionRef = collection(db, 'favMovies');
            const payload = {
                movieId: id,
                title,
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
        if(movieInFav) {
            try {
                setLoading(true);
                const docRef = doc(db, 'favMovies', movieInFav.id);
                await deleteDoc(docRef)
                setMovieInFav(null);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        const filmsCollection = collection(db, 'favMovies');
        if(isAuth) {
            try {
                onSnapshot(filmsCollection, (snapshot) => {
                    const movies: IFavMovie[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data() as Omit<IFavMovie, 'id'>,
                    }));
                    const inFav = movies.find(movie => movie.movieId === id && movie.userEmail === email);
                    if(inFav) {
                        setMovieInFav(inFav);
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
                        {isAuth && (
                            loading ? <Spinner /> : (
                                <button
                                    className={movieInFav ? 'film-info__btn film-info__btn--active' : 'film-info__btn'}
                                    onClick={movieInFav ? removeFromWatchList : addToWatchList}
                                >
                                    {movieInFav 
                                        ? (
                                            <p><img src={done} alt='remove'/>In watchlist</p>
                                        ) 
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
                        <Cast id={id} type='film' />       
                    </div>
                </div>
                <Trailer id={id} type='film' />
            </div>
        </div>
    )
}

export default FilmInfo