import { FC, useState, useEffect } from 'react';
import { API_MOVIE, API_KEY } from '../../constants/api';
import axios from 'axios';
import Spinner from '../Ui/Spinner/Spinner';
import './Trailer.scss';

interface TrailerProps {
    id: number;
}

interface Video {
    id: string;
    name: string;
    type: string;
    key: string;
}

const Trailer:FC<TrailerProps> = ({ id }) => {
    const [video, setVideo] = useState<Video>();
    const [loading, setLoading] = useState<boolean>(false);

    const getVideo = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_MOVIE + '/' + id + '/videos' + API_KEY);
            if(responce.status === 200) {
                console.log(responce.data);
                const data:Video[] = responce.data.results;
                const trailerVideo = data.find(item => item.type === 'Trailer');
                if(trailerVideo) {
                    setVideo(trailerVideo);
                } else {
                    setVideo(data[0]);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVideo();
    }, [id])

    return (
        <div className="trailer">
            {loading ? <Spinner /> : (
                video && (
                    <>
                        <h6 className='trailer__title'>{video.name}</h6>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.key}`}
                            className='trailer__video'
                            title={video.name}
                            allowFullScreen
                        />
                    </>
                )
            )}
        </div>
    )
}

export default Trailer