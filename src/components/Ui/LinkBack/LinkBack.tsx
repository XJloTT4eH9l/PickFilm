import { useNavigate }  from 'react-router-dom';
import iconBack from '../../../assets/img/back.svg';
import './LinkBack.scss';

const LinkBack = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div
            className='link-back'
            onClick={handleGoBack}
        >
            <img src={iconBack} className='link-back__img' alt='Go back' />
            <span>Go back</span>
        </div>
    )
}

export default LinkBack;