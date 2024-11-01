import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice'; 
import FavoriteReducer from '../Redux/Favoriteslice.js'; 
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    Favorite: FavoriteReducer,
    user: userReducer,
    
  },
});

export default store;
