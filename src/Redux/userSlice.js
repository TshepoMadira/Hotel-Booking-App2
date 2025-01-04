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
  },
});

export const { setUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;