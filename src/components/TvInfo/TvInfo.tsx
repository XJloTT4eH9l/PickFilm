import { FC } from 'react';
import { BASE_POSTER } from '../../constants/api';
import { ITvDetail } from '../../types/types';
import LinkBack from '../Ui/LinkBack/LinkBack';

interface TvInfoProps {
    tvInfo: ITvDetail
}

const TvInfo:FC<TvInfoProps> = ({ tvInfo }) => {
    const {
        id,
        name,
        originalName,
        overview,
        releaseDate,
        lastDate,
        voteAverage,
        posterPath,
        tagline,
        genres,
        numberOfSeasons,
        numberOfEpisodes,
        inProduction,
    } = tvInfo;
    return (
        <div className="film-info">
            <LinkBack />
            <h1 className='film-info__title'>{name}</h1>
            <h2 className='film-info__subtitle'>{originalName}</h2>
            <div className="film-info__inner">
                <img className='film-info__poster' src={BASE_POSTER + posterPath} alt={name} />
                <div className="film-info__details">
                    <div className='film-info__detail'>
                        <p className="film-info__text">Rating:</p>
                        <p className="film-info__field">{voteAverage}</p>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Year:</p>
                        <p className="film-info__field">
                            {
                                inProduction 
                                    ?  releaseDate.split('-')[0] + ' - present' 
                                    :  releaseDate.split('-')[0] + ' - ' + lastDate.split('-')[0]
                            }
                        </p>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Genre:</p>
                        <ul className="film-info__field">
                            {genres.map(genre => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Seasons:</p>
                        <p className="film-info__field">{numberOfSeasons}</p>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Episodes:</p>
                        <p className="film-info__field">{numberOfEpisodes}</p>
                    </div>
                    {tagline && (
                        <div className='film-info__detail tagline'>
                            <p className="film-info__text">Tagline:</p>
                            <p className="film-info__field">{tagline}</p>
                        </div>
                    )}
                </div>
            </div>
            {tagline && (
                <div className='tagline--bottom'>
                    <p className="film-info__text">Tagline:</p>
                    <p className="film-info__field">{tagline}</p>
                </div>
            )}
            <h3 className='film-info__title'>What is the series about:</h3>
            <p className="film-info__overwiev">{overview}</p>
        </div>
    )
}

export default TvInfo;