import { FC } from 'react';
import './Btn.scss';

interface BtnProps {
    name: string;
    classes: string;
    btnHandler?: () => Promise<void>;
}

const Btn:FC<BtnProps> = ({ classes, btnHandler, name }) => {
    return (
        <button 
            className={classes}
            onClick={btnHandler}
        >
            {name}
        </button>
    )
}

export default Btn