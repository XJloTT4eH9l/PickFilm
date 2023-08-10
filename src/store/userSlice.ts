import { createSlice } from '@reduxjs/toolkit';

interface User {
    email: string | null;
    token: string | null;
    id: string | null;
    name: string | null;
}

const defaultUser: User = {
    email: null,
    token: null,
    id: null,
    name: null
};

const tempUser = sessionStorage.getItem('pickFilmUser');
const cartItemsState = tempUser ? JSON.parse(tempUser) : defaultUser;

const initialState = cartItemsState;


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.name = action.payload.name;
            sessionStorage.setItem('pickFilmUser', JSON.stringify({...state}));
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.name = null;
            sessionStorage.setItem('pickFilmUser', JSON.stringify({...state}));
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;