import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ACTOR, API_KEY } from '../../constants/api';
import { IFilmShort } from '../../types/types';
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

const Filmography:FC<FilmSliderProps> = ({ id }) => {
    const [films, setFilms] = useState<Film[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const getFilms = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_ACTOR + id + '/movie_credits' + API_KEY);
            if(responce.status === 200) {
                setFilms(responce.data.cast);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFilms()
    }, [id])

    return (
        <section className='filmography'>
            <h2 className='filmography__title'>Films</h2>
            {loading ? <Spinner /> : (
                films && <Slider films={films.sort((a,b) => b.popularity - a.popularity)} />
            )}
        </section>
    )
}

export default Filmography