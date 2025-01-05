import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: '',
    email: '',
    phone: '',
  },
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload }; 
    },
    updateUserProfile(state, action) {
      return { ...state, ...action.payload }; 
    },
    logoutUser(state) {
      return {
        id: null,
        name: '',
        email: '',
        phone: '',
      }; 
    },
  },
});

export const { setUser, updateUserProfile, logoutUser } = userSlice.actions;
export default userSlice.reducer;