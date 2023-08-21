import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ACTOR, API_KEY } from '../../constants/api';
import Slider from '../Slider/Slider';
import Spinner from '../Ui/Spinner/Spinner';
import './Fimography.scss';

interface FilmSliderProps {
    id: number;
    type: string;
}

interface Film {
    id: number;
    title: string;
    poster_path: string;
    popularity: number;
}

const Filmography:FC<FilmSliderProps> = ({ id, type }) => {
    const [films, setFilms] = useState<Film[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getFilms = async () => {
            try {
                setLoading(true);
                const responce = await axios.get(API_ACTOR + id + `/${type}_credits` + API_KEY);
                if(responce.status === 200) {
                    setFilms(responce.data.cast);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getFilms()
    }, [id, type])

    return (
        <section className='filmography'>
            <h2 className='filmography__title'>{type === 'movie' ? 'Movies' : 'Series'}</h2>
            {loading ? <Spinner /> : (
                films && films.length > 0 && (
                    <Slider type={type} films={films.sort((a,b) => b.popularity - a.popularity)} />
                )
            )}
        </section>
    )
}

export default Filmography