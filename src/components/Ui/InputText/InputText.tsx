import { FC } from 'react';
import './InputText.scss';

interface InputTextProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
}

const InputText:FC<InputTextProps> = ({ value, setValue, placeholder }) => {
    const  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return (
        <input 
            type='text'
            maxLength={20}
            value={value}
            className="input-text"
            placeholder={placeholder}
            onChange={handleChangeInput}
        />
    )
}

export default InputText;