import { createSlice } from '@reduxjs/toolkit';

const Favoriteslice = createSlice({
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
  },
});

export const { toggleFavorite } = Favoriteslice.actions;
export default Favoriteslice.reducer;
