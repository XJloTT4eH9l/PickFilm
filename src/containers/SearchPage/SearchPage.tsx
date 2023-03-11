import { useState, useEffect, FC } from 'react';

import { API_SEARCH_MOVIE } from '../../constants/api';
import { IFilmShort } from '../../types/types';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';

import Spinner from '../../components/Ui/Spinner/Spinner';
import InputText from '../../components/Ui/InputText/InputText';
import FilmItem from '../../components/FilmItem/FilmItem';

import './SearchPage.scss';

const SearchPage:FC = () => {
    const [value, setValue] = useState<string>('');
    const [movies, setMovies] = useState<IFilmShort[]>();
    const [loadig, setLoading] = useState<boolean>(false);

    const debouncedSearch = useDebounce(value, 500);

    useEffect(() => {
        const getSearchMovie = async () => {
            try {
                setLoading(true);
    
                const res = await axios.get(API_SEARCH_MOVIE + '&query=' + debouncedSearch + '&page=1&include_adult=false');
                setMovies(res.data.results);
    
                setLoading(false);
            } catch (error) {
                alert(error);
            }
        }

        if(debouncedSearch) getSearchMovie();
    }, [debouncedSearch])

    return (
        <section className="search-page">
            <div className="container">
                <h1 className="search-page__title">Search</h1>
                <InputText 
                    value={value} 
                    setValue={setValue} 
                    placeholder='Find movie...'
                />

                { 
                    loadig ? <Spinner /> : (
                        movies?.length ? (
                            <ul className='search-page__list'>
                                {
                                    movies.map((movie, i) => {
                                        if(i < 8) {
                                            return (
                                                <FilmItem 
                                                    id={movie.id}
                                                    key={movie.id} 
                                                    title={movie.title} 
                                                    poster_path={movie.poster_path}
                                                />
                                            )
                                        }
                                    })
                                }
                            </ul>
                        ) : <h2 className='search-page__results'>No results</h2>
                    )
                }
            </div>
        </section>
    )
}

export default SearchPage;