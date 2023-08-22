import { useState, useEffect, useRef, FC } from 'react';

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
    const selectRef = useRef<HTMLSelectElement>(null);
    const searchState = sessionStorage.getItem('searchType');
    const searchStorageInitial = searchState ? JSON.parse(searchState) : 'movie';
    const searchResults = sessionStorage.getItem('searchResults');
    const seatchState = searchResults ? JSON.parse(searchResults) : [];
    const searchValue = sessionStorage.getItem('searchValue');
    const searchValueState =  searchValue ? JSON.parse(searchValue) : '';


    const [value, setValue] = useState<string>(searchValueState);
    const [searchData, setSearchData] = useState<any[]>(seatchState);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchOption, setSearchOption] = useState<string>(searchStorageInitial);

    const selectOptions: SearchOption[] = [
        { id: 1, value: 'movie' },
        { id: 2, value: 'tv' },
        { id: 3, value: 'person' },
    ];

    const debouncedSearch = useDebounce(value, 500);

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchOption(e.target.value);
        sessionStorage.setItem('searchType', JSON.stringify(e.target.value));
    }

    useEffect(() => {
        const selectElement = selectRef.current;

        if(selectElement) {
            const searchState = sessionStorage.getItem('searchType');

            if(searchState) {
              selectElement.value = JSON.parse(searchState);
            } else {
              selectElement.value = selectOptions[0].value;
            }
        }
    }, [])

    useEffect(() => {
        const getSearchMovie = async () => {
            try {
                setLoading(true);
                const res = await axios.get(BASE_URL + `/search/${searchOption}` + API_KEY + '&query=' + debouncedSearch + '&page=1&include_adult=false');
                setSearchData(res.data.results);
                sessionStorage.setItem('searchResults', JSON.stringify(res.data.results));
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
                <div className="search-page__container">
                    <InputText
                        value={value}
                        setValue={setValue}
                        placeholder={`Find ${searchOption}...`}
                        className='input-text--search'
                    />
                    <select 
                        ref={selectRef} 
                        className='search-page__select' 
                        onChange={(e) => onSelectChange(e)}
                    >
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
                </div>
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