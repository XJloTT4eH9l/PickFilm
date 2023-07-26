import { FC, useState, useEffect, useRef } from 'react';
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

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

    useEffect(() => {
        if (iframeRef.current) {
            const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
            iframeRef.current.setAttribute('height', height);
          }
    }, []);

    return (
        <div className="trailer">
            {loading ? <Spinner /> : (
                video && (
                    <>
                        <h6 className='trailer__title'>{video.name}</h6>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.key}`}
                            width="100%"
                            height="500px"
                            ref={iframeRef}
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