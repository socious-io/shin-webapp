import { createSlice } from '@reduxjs/toolkit';
import { UserProfileRes } from 'src/core/adaptors';

export interface UserState {
  userProfile: UserProfileRes;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userProfile: {
    id: '',
    avatar: {},
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      state.isAuthenticated = true;
    },
    clearUserProfile: state => {
      state.userProfile = initialState.userProfile;
      state.isAuthenticated = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserProfile, clearUserProfile, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
