import spinner from '../../../assets/img/spinner.svg';
import './Spinner.scss';

const Spinner = () => {
    return <img className="spinner" src={spinner} alt='Loading...'/>
}

export default Spinner;