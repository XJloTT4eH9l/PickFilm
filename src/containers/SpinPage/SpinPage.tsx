import FilmRoulet from '../../components/FilmRoulet/FilmRoulet';
import './SpinPage.scss';

const SpinPage = () => {
    return (
        <div className="spin-page">
            <div className="container">
                <h1 className='spin-page__title'>What Should I Watch?</h1>
                <p className="spin-page__text">Wondering what to watch?<br />Let us, pick from the TMBD catalog.<br />Take a chance on something new with PickFilm randomizer.</p>
                <div className="spin-page__inner">
                    <FilmRoulet />
                </div>
            </div>
        </div>
    )
}

export default SpinPage