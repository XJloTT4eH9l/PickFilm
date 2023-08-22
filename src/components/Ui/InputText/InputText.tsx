import { FC } from 'react';
import './InputText.scss';

interface InputTextProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    className?: string;
}

const InputText:FC<InputTextProps> = ({ value, setValue, placeholder, className}) => {
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if(className === 'input-text--search') {
            sessionStorage.setItem('searchValue', JSON.stringify(e.target.value));
        }
    }
    return (
        <input 
            type='text'
            maxLength={20}
            value={value}
            className={`input-text ${className}`}
            placeholder={placeholder}
            onChange={handleChangeInput}
        />
    )
}

export default InputText;