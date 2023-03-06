import { useState, FC } from 'react';
import { IGenre } from '../../../types/types';
import arrow from '../../../assets/img/arrow.svg';
import './DropDown.scss';

interface DropDownProps {
    items: IGenre[];
    currentItem: IGenre;
    setCurrentItem: (genre: IGenre) => void;
    classes?: string;
}

const DropDown: FC<DropDownProps> = ({items, currentItem, setCurrentItem, classes}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const itemHandler = (item: IGenre) => {
        setCurrentItem(item);
        setIsActive(false);
    }
    
    return (
        <div className='drop-down'>
            <div className="drop-down__btn" onClick={() => setIsActive(prev => !prev)}>
                <span>{currentItem.name}</span>
                <img className={isActive ? 'drop-down__img drop-down__img--active' : 'drop-down__img'} src={arrow} alt='open genres'/>
            </div>
            {isActive && (
                <ul className={`drop-down__content ${classes}`}>
                    {items.map(item => (
                        <li 
                            key={item.id} 
                            className='drop-down__item'
                            onClick={() => itemHandler(item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropDown;