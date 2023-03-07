import { FC } from 'react';
import { BASE_POSTER } from '../../constants/api';
import { IFilmDetail } from '../../types/types';
import LinkBack from '../Ui/LinkBack/LinkBack';
import './FilmInfo.scss';

interface FilmInfoProps {
    filmInfo: IFilmDetail
}

const FilmInfo:FC<FilmInfoProps> = ({ filmInfo }) => {
    const {
        id,
        title,
        originalTitle, 
        posterPath, 
        overview, 
        releaseDate, 
        voteAverage, 
        genres, 
        backDropPath, 
        runTime, 
        tagline, 
        budget
    } = filmInfo;
    
    return (
        <div className='film-info'>
            <LinkBack />
            <h1 className='film-info__title'>{title}</h1>
            <h2 className='film-info__subtitle'>{originalTitle}</h2>
            <div className="film-info__inner">
                <img className='film-info__poster' src={BASE_POSTER + posterPath} alt={title} />
                <div className="film-info__details">
                    <div className='film-info__detail'>
                        <p className="film-info__text">Rating:</p>
                        <p className="film-info__field">{voteAverage}</p>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Release:</p>
                        <p className="film-info__field">{releaseDate.split('-')[0]}</p>
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
                        <p className="film-info__text">Runtime:</p>
                        <p className="film-info__field">{runTime} min</p>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Budget:</p>
                        <p className="film-info__field">{budget} $</p>
                    </div>
                    <div className='film-info__detail'>
                        <p className="film-info__text">Tagline:</p>
                        <p className="film-info__field">{tagline}</p>
                    </div>

                </div>
            </div>
            <h3 className='film-info__title'>About what film:</h3>
            <p className="film-info__overwiev">{overview}</p>
        </div>
    )
}

export default FilmInfo