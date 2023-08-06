import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setUser } from '../../store/userSlice';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { IUserData } from "../../types/types";
import Spinner from '../Ui/Spinner/Spinner';
import './Form.scss';

interface FormProps {
    type: string;
}

const Form:FC<FormProps> = ({ type }) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { 
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm<IUserData>({
        mode: 'onBlur'
    });

    const onSubmit = handleSubmit((userInfo) => {
        const auth = getAuth();
        const { email, password } = userInfo;
        if(type === 'Login') {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
                navigate("/");
            })
            .catch(() => setError('Invalid email or password'))
            setLoading(false);
        } else {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
                navigate("/");
            })
            .catch(() => setError('Cant register user with this mail or password'))
            setLoading(false);
        }
    })

    return (
        <form className="form" onSubmit={onSubmit}>
            <h1 className='form__title'>{type === 'Login' ? 'Log in' : 'Sign up'}</h1>
            <div className="form__field">
                <label  
                    htmlFor="email"
                    className='form__label'
                >
                    Email
                </label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={errors.email ? "form__input form__input--error" : 'form__input'}
                    {...register('email', {
                        required: 'This field is required',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Incorect email'
                        }
                    })}
                />
                {errors.email && <p className="form__error">{errors.email.message}</p>}
            </div>
            <div className="form__field">
                <label 
                    htmlFor="password"
                    className='form__label'
                >
                    Password
                </label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className={errors.password ? "form__input form__input--error" : 'form__input'}
                    {...register('password', {
                        required: 'This field is required',
                        minLength: {
                            value: 4,
                            message: 'Minimal lenght must be greater than 4 symbols'
                        },
                        maxLength: {
                            value: 25,
                            message: 'Max lenght must be less than 25 symbols'
                        }
                    })}
                />
                {errors.password && <p className="form__error">{errors.password.message}</p>}
            </div>
            <button className='form__submit' type='submit' disabled={!isValid}>Submit</button>
            {error.length > 0 && <p className='form__error form__error--center'>{error}</p>}
            {loading && <Spinner />}
            {type === 'Login' ? (
                <p className='form__message'>Not register yet? <Link to='/signup'>Sign in</Link></p>
            ) : (
                <p className='form__message'>Already have account? <Link to='/login'>Log in</Link></p>
            )}
        </form>
    )
}

export default Form;