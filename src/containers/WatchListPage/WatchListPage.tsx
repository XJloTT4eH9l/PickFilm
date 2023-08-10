import { FC, useState, useEffect } from 'react';

import db from '../../firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import { IFavMovie } from '../../types/types';

import LinkBack from '../../components/Ui/LinkBack/LinkBack';
import FilmItem from '../../components/FilmItem/FilmItem';
import TvItem from '../../components/TvItem/TvItem';
import arrow from '../../assets/img/arrow.svg';
import Spinner from '../../components/Ui/Spinner/Spinner';

import './WatchListPage.scss';

const WatchListPage:FC = () => {
    const [favMovies, setFavMovies] = useState<IFavMovie[]>([]);
    const [favSeries, setFavSeries] = useState<IFavMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { isAuth, email } = useAuth();

    const [moviesOpen, setMoviesOpen] = useState<boolean>(true);
    const [tvsOpen, setTvsOpen] = useState<boolean>(true);


    useEffect(() => {
        const filmsCollection = collection(db, 'favMovies');
        const seriesCollection = collection(db, 'favSeries');

        if(isAuth) {
            try {
                setLoading(true);
                onSnapshot(filmsCollection, (snapshot) => {
                    const movies: IFavMovie[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data() as Omit<IFavMovie, 'id'>,
                    }));
                    const favoriteMovies = movies.filter(movie => movie.userEmail === email);
                    setFavMovies(favoriteMovies);
                })
                onSnapshot(seriesCollection, (snapshot) => {
                    const series: IFavMovie[] = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data() as Omit<IFavMovie, 'id'>,
                    }));
                    const favoriteSeries = series.filter(movie => movie.userEmail === email);
                    setFavSeries(favoriteSeries);
                })
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, [])

    return (
        <section className="watchlist-page">
            <div className="container">
                <LinkBack />
                <h1 className="watchlist-page__title">Watchlist</h1>
                <div className="watchlist-page__movies">
                    <h2 
                    className={moviesOpen ? 'watchlist-page__heading watchlist-page__heading--open' : 'watchlist-page__heading'}
                    onClick={() => setMoviesOpen(!moviesOpen)}
                    >
                        Movies
                        <img 
                            className={moviesOpen ?  'watchlist-page__arrow watchlist-page__arrow--active' : 'watchlist-page__arrow'} 
                            src={arrow} 
                            alt='Open movies watchlist'
                        />
                    </h2>
                    {loading ? <Spinner /> : (
                        favMovies.length > 0 ? (
                            <ul className={moviesOpen ? 'watchlist-page__list watchlist-page__list--active' : 'watchlist-page__list'}>
                                {favMovies.map(movie => (
                                    <FilmItem 
                                        key={movie.movieId} 
                                        id={movie.movieId}
                                        title={movie.title} 
                                        poster_path={movie.posterPath}
                                    />
                                ))}
                            </ul>
                        ) : moviesOpen && <h3 className='watchlist-page__subtitle'>Add at least one movie to watchlist</h3>
                    )
                    }
                </div>
                <div className="watchlist-page__tvs">
                    <h2 className={tvsOpen ? 'watchlist-page__heading watchlist-page__heading--open' : 'watchlist-page__heading'}
                    onClick={() => setTvsOpen(!tvsOpen)}
                    >
                        Series
                        <img 
                            className={tvsOpen ?  'watchlist-page__arrow watchlist-page__arrow--active' : 'watchlist-page__arrow'} 
                            src={arrow} 
                            alt='Open movies watchlist'
                        />
                    </h2>
                    {loading ? <Spinner /> : (
                        favSeries.length > 0 ? (
                            <ul className={tvsOpen ? 'watchlist-page__list watchlist-page__list--active' : 'watchlist-page__list'}>
                                {favSeries.map(movie => (
                                    <TvItem 
                                        key={movie.movieId} 
                                        id={movie.movieId}
                                        title={movie.title} 
                                        poster_path={movie.posterPath}
                                    />
                                ))}
                            </ul>
                        ) : tvsOpen && <h3 className='watchlist-page__subtitle'>Add at least one series to watchlist</h3>
                    )
                    }
                </div>
            </div>
        </section>
    )
}

export default WatchListPage;