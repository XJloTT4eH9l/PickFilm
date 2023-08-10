import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';


import { IFilmDetail } from '../../types/types';
import { API_KEY, API_MOVIE } from '../../constants/api';

import FilmInfo from '../../components/FilmInfo/FilmInfo';
import Spinner from '../../components/Ui/Spinner/Spinner';
import axios from 'axios';

import './MoviePage.scss';

const MoviePage:FC = () => {
    const { id } = useParams();
    const [filmInfo, setFilmInfo] = useState<IFilmDetail>();
    const [loading, setLoading] = useState<boolean>(false);

    const getFilmInfo = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_MOVIE + '/' + id + API_KEY);

            const filmObject: IFilmDetail = {
                id : responce.data.id,
                title: responce.data.title,
                originalTitle: responce.data.original_title,
                overview: responce.data.overview,
                releaseDate: responce.data.release_date,
                voteAverage: responce.data.vote_average,
                posterPath: responce.data.poster_path,
                backdropPath: responce.data.backdrop_path,
                genres: responce.data.genres,
                runTime: responce.data.runtime,
                tagline: responce.data.tagline,
                budget: responce.data.budget
            }

            setFilmInfo(filmObject);
            setLoading(false);

        } catch (error) {
           alert(error); 
        }
    }

    useEffect(() => {
        getFilmInfo();
    }, [])
    
    return (
        <section className='movie-page'>
            { 
                loading ? <Spinner /> : (
                    filmInfo && (
                        <FilmInfo filmInfo={filmInfo}/>
                    ) 
                )
            }
        </section>
    )
}

export default MoviePage;