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

// interface Tv {
//     id: number;
//     name: string;
//     poster_path: string;
//     popularity: number;
// }

const Filmography:FC<FilmSliderProps> = ({ id, type }) => {
    const [films, setFilms] = useState<Film[]>();
    // const [series, setSeries] = useState<Tv[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const getFilms = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_ACTOR + id + `/${type}_credits` + API_KEY);
            console.log(responce.data);
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