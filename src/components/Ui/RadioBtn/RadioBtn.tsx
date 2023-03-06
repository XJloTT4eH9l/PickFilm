import { FC } from 'react';
import './RadioBtn.scss';

interface RadioBtnProps {
    id: string;
    type: string;
    setType: (t: string) => void;
}

const RadioBtn:FC<RadioBtnProps> = ({id, type, setType }) => {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.id);
    }

    return (
        <div className='radio-btn__container'>
            <input
                type='radio'
                id={id}
                name={type}
                className='radio-btn'
                checked={type === id}
                onChange={(e) => changeHandler(e)} 
            />
            <label htmlFor={id}>{id}</label>
        </div>
    )
}

export default RadioBtn;