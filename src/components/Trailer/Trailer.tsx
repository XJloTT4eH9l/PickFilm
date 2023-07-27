import { FC, useState, useEffect } from 'react';
import { API_MOVIE, API_TV, API_KEY } from '../../constants/api';
import axios from 'axios';
import YouTube from 'react-youtube';
import Spinner from '../Ui/Spinner/Spinner';
import './Trailer.scss';

interface TrailerProps {
    id: number;
    type: string;
}

interface Video {
    id: string;
    name: string;
    type: string;
    key: string;
}

const Trailer:FC<TrailerProps> = ({ id, type }) => {
    const [video, setVideo] = useState<Video>();
    const [loading, setLoading] = useState<boolean>(false);

    const getVideo = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(type === 'film' 
                ? API_MOVIE + '/' + id + '/videos' + API_KEY
                : API_TV + '/' + id + '/videos' + API_KEY
            );
            if(responce.status === 200) {
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
                        <YouTube 
                            videoId={video.key} 
                            className='trailer__video'
                            opts={
                                {
                                    width: '100%',
                                    height: '100%',
                                    playerVars: {
                                        autoplay: 0,
                                        controls: 1,
                                        cc_load_policy: 0,
                                        fs: 1,
                                        rel: 0,
                                        showinfo: 0,
                                    },
                                }
                            } 
                        />
                    </>
                )
            )}
        </div>
    )
}

export default Trailer