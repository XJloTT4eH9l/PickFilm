import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_MOVIE, API_TV, API_KEY } from '../../constants/api';
import { BASE_POSTER } from '../../constants/api';
import axios from 'axios';
import Spinner from '../Ui/Spinner/Spinner';
import actorPlaceholder from '../../assets/img/actorPlaceholder.png';
import './Cast.scss';

interface CastProps {
    id: number;
    type: string;
}

interface Actor {
    id: number;
    name: string;
    profile_path: string;
    character: string;
}

const Cast:FC<CastProps> = ({ id, type }) => {
    const [cast, setCast] = useState<Actor[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getCast = async () => {
            try {
                setLoading(true);
                const responce = await axios.get( type === 'film' 
                    ? API_MOVIE + '/' + id + '/credits' + API_KEY
                    : API_TV + '/' + id + '/credits' + API_KEY
                 );
                if(responce.status === 200) {
                    setCast(responce.data.cast);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getCast();
    }, [id, type])

    return (
        <div className='cast'>
            {cast && cast.length > 0 && <h3 className='cast__title'>Cast</h3>}
            
            {loading ? <Spinner /> : (
                cast && (
                    <ul className="cast__list">
                        {cast
                            .filter((_, i) => i < 5)
                            .map(actor => (
                                <li 
                                    key={actor.id} 
                                    className='cast__actor'
                                >
                                    <Link to={`/person/${actor.id}`}>
                                        <img 
                                            className='cast__img' 
                                            src={actor.profile_path === null ? actorPlaceholder : BASE_POSTER + actor.profile_path} 
                                            alt={actor.name} 
                                        />
                                        <h4 className="cast__name">{actor.name}</h4>
                                    </Link>
                                </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
}

export default Cast