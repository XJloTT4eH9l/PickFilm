import { useState, useEffect, FC } from 'react';
import { API_POPULAR_MOVIES } from '../../constants/api';
import { IFilmShort } from '../../types/types';

import FilmItem from '../../components/FilmItem/FilmItem';
import Spinner from '../../components/Ui/Spinner/Spinner';
import axios from 'axios';

import './CatalogPage.scss';

const CatalogPage:FC = () => {
    const tempPage = sessionStorage.getItem('page');
    const moviesState = tempPage ? JSON.parse(tempPage) : 1;

    const [movies, setMovies] = useState<IFilmShort[]>();
    const [page, setPage] = useState<number>(moviesState);
    const [lastPage, setLastPage] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);

    const getPopularMovies = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_POPULAR_MOVIES + `&page=${page}`);
            setMovies(responce.data.results);
            setLastPage(responce.data.total_pages);
            sessionStorage.setItem('page', JSON.stringify(page));
            setLoading(false);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getPopularMovies();
    }, [])

    useEffect(() => {
        getPopularMovies();
        window.scrollTo(0, 0);
    }, [page])
    
    return (
        <section className="catalog-page">
            <div className="container">
                <h1 className="catalog-page__title">Catalog</h1>
                <h2 className='catalog-page__subtitle'>Popular</h2>
                {
                    loading ? <Spinner /> : (
                        movies?.length && (
                            <ul className='search-page__list'>
                                {
                                    movies.map((movie) => {
                                        return (
                                            <FilmItem 
                                                id={movie.id}
                                                key={movie.id} 
                                                title={movie.title} 
                                                poster_path={movie.poster_path}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        )
                    )
                }
                <div className="catalog-page__btn-container">
                    <button disabled={page === 1} className='catalog-page__btn' onClick={() => setPage(page - 1)}>Previous Page</button>
                    <button disabled={page === lastPage} className='catalog-page__btn' onClick={() => setPage(page + 1)}>Next Page</button>
                </div>
            </div>
        </section>
    )
}

export default CatalogPage;