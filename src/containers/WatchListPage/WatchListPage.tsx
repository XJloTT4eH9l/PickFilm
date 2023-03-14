import { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

import FilmItem from '../../components/FilmItem/FilmItem';
import TvItem from '../../components/TvItem/TvItem';
import arrow from '../../assets/img/arrow.svg';

import './WatchListPage.scss';

const WatchListPage:FC = () => {
    const movies = useAppSelector(state => state.watchList.movies);
    const tvs = useAppSelector(state => state.watchList.tvs);

    const [moviesOpen, setMoviesOpen] = useState<boolean>(true);
    const [tvsOpen, setTvsOpen] = useState<boolean>(true);

    return (
        <section className="watchlist-page">
            <div className="container">
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
                    {
                        movies.length > 0 ? (
                            <ul className={moviesOpen ? 'watchlist-page__list watchlist-page__list--active' : 'watchlist-page__list'}>
                                {movies.map(movie => (
                                    <FilmItem 
                                        id={movie.id}
                                        key={movie.id} 
                                        title={movie.title} 
                                        poster_path={movie.posterPath}
                                    />
                                ))}
                            </ul>
                        ) : moviesOpen && <h3 className='watchlist-page__subtitle'>Add at least one movie to watchlist</h3>
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
                    {
                        tvs.length > 0 ? (
                            <ul className={tvsOpen ? 'watchlist-page__list watchlist-page__list--active' : 'watchlist-page__list'}>
                                {tvs.map(movie => (
                                    <TvItem 
                                        id={movie.id}
                                        key={movie.id} 
                                        title={movie.title} 
                                        poster_path={movie.posterPath}
                                    />
                                ))}
                            </ul>
                        ) : tvsOpen && <h3 className='watchlist-page__subtitle'>Add at least one series to watchlist</h3>
                    }
                </div>
            </div>
        </section>
    )
}

export default WatchListPage;