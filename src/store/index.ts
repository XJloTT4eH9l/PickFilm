import { configureStore } from '@reduxjs/toolkit';
import watchListReducer from './watchListSlice';
import userReduser from './userSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    watchList: watchListReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;