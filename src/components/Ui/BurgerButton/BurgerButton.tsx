import { FC } from 'react';
import './BurgerButton.scss';

interface BurgerProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (item: boolean) => void;
}
const BurgerButton:FC<BurgerProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <button 
            className={mobileMenuOpen ? 'burger burger--active' : 'burger'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
            <span className='burger__item'></span>
            <span className='burger__item'></span>
            <span className='burger__item'></span>
        </button>
    )
}

export default BurgerButton;