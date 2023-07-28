import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IFilmShort } from '../../types/types';
import { Navigation } from 'swiper/modules';
import FilmItem from '../FilmItem/FilmItem';
import './Slider.scss';
import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps {
    films: IFilmShort[];
}

const Slider:FC<SliderProps> = ({ films }) => {
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
                    <FilmItem
                        id={film.id}
                        title={film.title}
                        poster_path={film.poster_path} 
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider