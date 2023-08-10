import { FC } from 'react';
import './RadioBtn.scss';

interface RadioBtnProps {
    id: string;
    type: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioBtn:FC<RadioBtnProps> = ({ id, type, handleChange }) => {
    return (
        <div className='radio-btn__container'>
            <input
                type='radio'
                id={id}
                name={type}
                className='radio-btn'
                checked={type === id}
                onChange={(e) => handleChange(e)} 
            />
            <label htmlFor={id}>{id}</label>
        </div>
    )
}

export default RadioBtn;