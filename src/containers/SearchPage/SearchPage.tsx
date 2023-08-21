import { useState, useEffect, FC } from 'react';

import { BASE_URL, API_KEY } from '../../constants/api';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';

import Spinner from '../../components/Ui/Spinner/Spinner';
import InputText from '../../components/Ui/InputText/InputText';
import SearchItem from '../../components/SearchItem/SearchItem';

import './SearchPage.scss';

interface SearchOption {
    id: number;
    value: string;
}

const SearchPage: FC = () => {
    const [value, setValue] = useState<string>('');
    const [searchData, setSearchData] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchOption, setSearchOption] = useState<string>('movie');

    const selectOptions: SearchOption[] = [
        { id: 1, value: 'movie' },
        { id: 2, value: 'tv' },
        { id: 3, value: 'person' },
    ];

    const debouncedSearch = useDebounce(value, 500);

    useEffect(() => {
        const getSearchMovie = async () => {
            try {
                setLoading(true);
                const res = await axios.get(BASE_URL + `/search/${searchOption}` + API_KEY + '&query=' + debouncedSearch + '&page=1&include_adult=false');
                setSearchData(res.data.results);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        }

        if (debouncedSearch) getSearchMovie();
    }, [debouncedSearch, searchOption])

    return (
        <section className="search-page">
            <div className="container">
                <h1 className="search-page__title">Search</h1>
                <InputText
                    value={value}
                    setValue={setValue}
                    placeholder={`Find ${searchOption}...`}
                />
                <select className='search-page__select' onChange={(e) => setSearchOption(e.target.value)}>
                    {selectOptions.map(option => (
                        <option
                            key={option.id}
                            value={option.value}
                            className='search-page__option'
                        >
                            {option.value}
                        </option>
                    ))}
                </select>

                {
                    loading ? <Spinner /> : (
                        searchData?.length ? (
                            <ul className='search-page__list'>
                                {
                                    searchData.map((searchItem) => (
                                        <SearchItem
                                            key={searchItem.id} 
                                            id={searchItem.id}
                                            title={searchItem.title ? searchItem.title : searchItem.name} 
                                            poster_path={searchItem.poster_path ? searchItem.poster_path : searchItem.profile_path}
                                            type={searchOption}
                                        />
                                    ))
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