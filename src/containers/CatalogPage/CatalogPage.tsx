import { useState, useEffect, FC } from 'react';
import { API_POPULAR_MOVIES, API_BASE_MOVIES, API_KEY } from '../../constants/api';
import { IFilmShort } from '../../types/types';

import FilmItem from '../../components/FilmItem/FilmItem';
import Spinner from '../../components/Ui/Spinner/Spinner';
import axios from 'axios';

import './CatalogPage.scss';


interface FilmInterface {
    id:number;
    title: string;
    href: string;
}

const CatalogPage:FC = () => {
    const tempPage = sessionStorage.getItem('page');
    const tempActiveType = sessionStorage.getItem('activeMovieType');
    const activeTypeState = tempActiveType ? JSON.parse(tempActiveType) : { id: 1, title: 'Popular', href:'popular' }
    const moviesState = tempPage ? JSON.parse(tempPage) : 1;

    const [movies, setMovies] = useState<IFilmShort[]>();
    const [page, setPage] = useState<number>(moviesState);
    const [lastPage, setLastPage] = useState<number>();
    const [activeType, setActiveType] = useState<FilmInterface>(activeTypeState);
    const [loading, setLoading] = useState<boolean>(false);

    const filmTypes = [
        { id: 1, title: 'Popular', href:'popular' },
        { id: 2, title: 'Now Playing', href:'now_playing' },
        { id: 3, title: 'Top Rated', href:'top_rated' },
    ];

    const onTypeChange = (type: FilmInterface) => {
        setPage(1);
        setActiveType(type);
        sessionStorage.setItem('activeMovieType', JSON.stringify(type));
    }

    const getMovies = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_BASE_MOVIES + activeType.href + API_KEY + '&language=en-US' + `&page=${page}`);
            setMovies(responce.data.results);
            setLastPage(responce.data.total_pages);
            sessionStorage.setItem('page', JSON.stringify(page));
            setLoading(false);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getMovies();
        window.scrollTo(0, 0);
    }, [activeType, page])
    
    return (
        <section className="catalog-page">
            <div className="container">
                <h1 className="catalog-page__title">Catalog</h1>
                <ul className='catalog-page__types'>
                    {filmTypes.map(type => {
                        const isActive = activeType.href === type.href;
                        return (
                            <li 
                                key={type.id}
                                className='catalog-page__item'
                                onClick={() => onTypeChange(type)}
                            >
                                <button 
                                    className={isActive ? 'catalog-page__type catalog-page__type--active' : 'catalog-page__type'}
                                >
                                    {type.title}
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <h2 className='catalog-page__subtitle'>{activeType.title}</h2>
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