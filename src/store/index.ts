import { configureStore } from '@reduxjs/toolkit';
import watchListReducer from './watchListSlice';

const store = configureStore({
  reducer: {
    watchList: watchListReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;