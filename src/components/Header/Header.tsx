import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__inner">
                    <div className="header__logo">
                        <span>Pick<strong>Film</strong></span>
                    </div>

                    <nav className='nav'>
                        <ul className="nav__list">
                            <li className='nav__item'>
                                <NavLink className='nav__link' to='/'>Home</NavLink>
                            </li>
                            <li className='nav__item'>
                                <NavLink className='nav__link' to='/catalog'>Catalog</NavLink>
                            </li>
                            <li className='nav__item'>
                                <NavLink className='nav__link' to='/search'>Search</NavLink>
                            </li>
                        </ul>
                    </nav>

                     <NavLink className='nav__link' to='/watchList'>watchList</NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;