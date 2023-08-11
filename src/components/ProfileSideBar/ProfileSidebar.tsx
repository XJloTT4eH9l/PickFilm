import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeUser } from '../../store/userSlice';
import close from '../../assets/img/close.png';
import './ProfileSideBar.scss';

interface ProfileSideBarProps {
    profileOpen: boolean;
    setProfileOpen: (open: boolean) => void;
}

const ProfileSideBar:FC<ProfileSideBarProps> = ({ profileOpen, setProfileOpen }) => {
    const dispatch = useAppDispatch();
    const { email } = useAuth();
    const naigate = useNavigate();

    const onOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setProfileOpen(false);
    }

    const onLogOut = () => {
        setProfileOpen(false);
        document.body.style.overflow = '';
        naigate('/');
        dispatch(removeUser());
    }

    useEffect(() => {
        if(profileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [profileOpen])

    return (
        <>
            <div className={profileOpen ? "profile-side-bar profile-side-bar--active" : 'profile-side-bar'}>
                <div className="profile-side-bar__container">
                    <button className='profile-side-bar__close' onClick={() => setProfileOpen(false)}>
                        <img src={close} alt='close'/>
                    </button>
                    <div className="profile-side-bar__top">
                        <p className='profile-side-bar__user'>{email}</p>
                        <ul className='profile-side-bar__links'>
                            <li className='profile-side-bar__link' onClick={() => setProfileOpen(false)}>
                                <Link to='/watchlist'>Watchlist</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="profile-side-bar__botttom">
                        <button className='profile-side-bar__btn' onClick={onLogOut}>Log out</button>
                    </div>
                </div>
            </div>
            <div 
            className={profileOpen ? "profile-side-bar__overlay profile-side-bar__overlay--active" : 'profile-side-bar__overlay'}
            onClick={(e) => onOverlay(e)} 
            />
        </>
    )
}

export default ProfileSideBar