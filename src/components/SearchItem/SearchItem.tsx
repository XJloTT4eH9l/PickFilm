import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BASE_POSTER } from '../../constants/api';

import posterPlaceholder from '../../assets/img/movie-placeholder.png';

interface SearchItemProps {
    id: number | string;
    title: string;
    poster_path: string;
    type: string;
}

const SearchItem:FC<SearchItemProps> = ({ id, title, poster_path, type }) => {
    return (
        <li className='film-item'>
            <Link className='film-item__link' to={`/${type}/${id}`}>
                {
                    poster_path == null ? (
                        <img 
                            className='film-item__poster' 
                            src={posterPlaceholder} 
                            alt={title}
                        />
                        
                    ) : (
                        <img 
                            className='film-item__poster' 
                            src={BASE_POSTER + poster_path} 
                            alt={title}
                        />
                    )
                }
                <h3 className='film-item__title'>{title.length > 25 ? title.slice(0, 25) + '...' : title}</h3>
            </Link>
        </li>
    )
}

export default SearchItem;