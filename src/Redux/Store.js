import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice'; 
import FavoriteReducer from '../Redux/Favoriteslice.js'; 
import userReducer from './userSlice';
import ratingReducer from './ratingSlice.js'; 

const store = configureStore({
  reducer: {
    booking: bookingReducer,
    favorites: FavoriteReducer,
    user: userReducer,
    ratings: ratingReducer,
  },
});

export default store;