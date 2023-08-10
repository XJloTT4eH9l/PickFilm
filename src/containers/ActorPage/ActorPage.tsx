import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ACTOR, API_KEY, BASE_POSTER } from '../../constants/api';
import { IActor } from '../../types/types';
import axios from 'axios';
import LinkBack from '../../components/Ui/LinkBack/LinkBack';
import Filmography from '../../components/Filmography/Filmography';
import Spinner from '../../components/Ui/Spinner/Spinner';
import './ActorPage.scss';

const ActorPage = () => {
    const { id } = useParams();
    const [actorInfo, setActorInfo] = useState<IActor>();
    const [loading, setLoading] = useState<boolean>(false);

    const getActorInfo = async () => {
        try {
            setLoading(true);
            const responce = await axios.get(API_ACTOR + id + API_KEY);
            if(responce.status === 200) {
                const actor = {
                    id: responce.data.id,
                    name: responce.data.name,
                    biography: responce.data.biography,
                    birthday: responce.data.birthday,
                    deathday: responce.data.deathday,
                    placeOfBirth: responce.data.place_of_birth,
                    profilePath: responce.data.profile_path
                }
                setActorInfo(actor);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getActorInfo();
    }, [])
    return (
        <section className="actor-page">
            <div className="container">
                <LinkBack />
                {loading ? <Spinner /> : (
                    actorInfo && (
                        <div className='actor-page__container'>
                            <div className="actor-page__left">
                                <img className='actor-page__poster' src={BASE_POSTER + actorInfo.profilePath} alt={actorInfo.name} />
                                <div className="actor-page__info--mobile">
                                    <h1 className='actor-page__title'>{actorInfo.name}</h1>
                                    <p className='actor-page__field'>{actorInfo.placeOfBirth}</p>
                                </div>
                            </div>
                            <div className="actor-page__right">
                                <div className="actor-page__info">
                                    <h1 className='actor-page__title'>{actorInfo.name}</h1>
                                    <p className='actor-page__field'>{actorInfo.placeOfBirth}</p>
                                </div>
                                <p className="actor-page__text">{actorInfo.biography}</p>
                            </div>
                        </div>
                    )
                )}
                {actorInfo && (
                    <Filmography id={actorInfo.id} type='films' />
                )}
            </div>
        </section>
    )
}

export default ActorPage