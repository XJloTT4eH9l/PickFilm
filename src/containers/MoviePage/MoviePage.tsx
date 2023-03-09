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
    const filmId = id?.slice(1);
    const [filmInfo, setFilmInfo] = useState<IFilmDetail>();
    const [loading, setLoading] = useState<boolean>(false);

    const getFilmInfo = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_MOVIE + '/' + filmId + API_KEY);
            console.log(responce.data)

            const filmObject: IFilmDetail = {
                id : responce.data.id,
                title: responce.data.title,
                originalTitle: responce.data.original_title,
                overview: responce.data.overview,
                releaseDate: responce.data.release_date,
                voteAverage: responce.data.vote_average,
                posterPath: responce.data.poster_path,
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
            <div className="container">
                { 
                    loading ? <Spinner /> : (
                        filmInfo && (
                            <FilmInfo filmInfo={filmInfo}/>
                        ) 
                    )
                }
            </div>
        </section>
    )
}

export default MoviePage;