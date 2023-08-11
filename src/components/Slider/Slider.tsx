import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { IFilmShort, ITvShort } from '../../types/types';
import { Navigation } from 'swiper/modules';
import FilmItem from '../FilmItem/FilmItem';
import TvItem from '../TvItem/TvItem';
import './Slider.scss';
import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps {
    films: any[];
    type: string;
}

const Slider:FC<SliderProps> = ({ films, type }) => {
    const options = {
        slidesPerView: 1,
        spaceBetween: 50,
        navigation: true,
        modules: [Navigation],
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            900: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 5,
            }
        }
    }
    return (
        <Swiper
            {...options}
        >
            {films.map(film => (
                <SwiperSlide key={film.id}>
                    {type === 'movie' ? (
                        <FilmItem
                            id={film.id}
                            title={film.title}
                            poster_path={film.poster_path} 
                        />
                    ) : (
                        <TvItem
                            id={film.id}
                            title={film.name}
                            poster_path={film.poster_path} 
                        />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider