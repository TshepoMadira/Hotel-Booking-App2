import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: {}, 
};

const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRating: (state, action) => {
      const { roomId, rating } = action.payload;
      state.ratings[roomId] = rating; 
    },
    initializeRatings: (state, action) => {
      state.ratings = action.payload;
    },
  },
});

export const { setRating, initializeRatings } = ratingSlice.actions;

export default ratingSlice.reducer;