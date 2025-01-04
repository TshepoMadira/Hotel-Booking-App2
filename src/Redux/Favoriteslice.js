import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteRoomIds: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const roomId = action.payload;
      if (state.favoriteRoomIds.includes(roomId)) {
        state.favoriteRoomIds = state.favoriteRoomIds.filter(id => id !== roomId);
      } else {
        state.favoriteRoomIds.push(roomId);
      }
    },
    setFavorites: (state, action) => {
      state.favoriteRoomIds = action.payload; 
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;