import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import BurgerButton from '../Ui/BurgerButton/BurgerButton';
import './Header.scss';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return (
        <header className='header'>
            <div className="container">
                <div className="header__inner">
                    <Link to='/' className="header__logo">
                        <span>Pick<strong>Film</strong></span>
                    </Link>

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
                    
                        <div className={mobileMenuOpen ? 'mobile-menu mobile-menu--active' : 'mobile-menu'}>
                            <nav className='nav nav--mobile-menu'>
                                <ul className="nav__list nav__list--mobile-menu">
                                    <li className='nav__item--mobile-menu'>
                                        <NavLink 
                                            className='nav__link' 
                                            to='/'
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className='nav__item--mobile-menu'>
                                        <NavLink 
                                            className='nav__link' 
                                            to='/catalog' 
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Catalog
                                        </NavLink>
                                    </li>
                                    <li className='nav__item--mobile-menu'>
                                        <NavLink 
                                            className='nav__link' 
                                            to='/search' 
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Search
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    <BurgerButton 
                        mobileMenuOpen={mobileMenuOpen} 
                        setMobileMenuOpen={setMobileMenuOpen} 
                    />

                     <NavLink className='nav__link' to='/watchlist'>Watchlist</NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;