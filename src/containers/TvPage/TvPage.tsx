import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, API_TV } from '../../constants/api';
import { ITvDetail } from '../../types/types';

import Spinner from '../../components/Ui/Spinner/Spinner';
import TvInfo from '../../components/TvInfo/TvInfo';
import axios from 'axios';

import './TvPage.scss';

const TvPage:FC = () => {
    const { id } = useParams();
    const tvId = id?.slice(1);

    const [tvInfo, setTvInfo] = useState<ITvDetail>();
    const [loading, setLoading] = useState<boolean>(false);

    const getTvInfo = async () => {
        try {
            setLoading(true);

            const responce = await axios.get(API_TV + '/' + tvId + API_KEY);

            const tvObject: ITvDetail = {
                id : responce.data.id,
                name: responce.data.name,
                originalName: responce.data.original_name,
                overview: responce.data.overview,
                releaseDate: responce.data.first_air_date,
                lastDate: responce.data.last_air_date,
                voteAverage: responce.data.vote_average,
                posterPath: responce.data.poster_path,
                genres: responce.data.genres,
                numberOfSeasons: responce.data.number_of_seasons,
                numberOfEpisodes: responce.data.number_of_episodes,
                tagline: responce.data.tagline,
                inProduction: responce.data.in_production,
            }

            setTvInfo(tvObject);
            setLoading(false);
            console.log(responce.data);
        } catch (error) {
            alert(error); 
        }
    }

    useEffect(() => {
        getTvInfo();
    }, [])

    return (
        <section className="tv-page">
            <div className="container">
                { 
                    loading ? <Spinner /> : (
                        tvInfo && (
                            <TvInfo tvInfo={tvInfo}/>
                        ) 
                    )
                }
            </div>
        </section>
    )
}

export default TvPage;