import { createSlice } from '@reduxjs/toolkit';
import { OrgProfileRes } from 'src/core/adaptors';

export interface UserState {
  orgProfile: OrgProfileRes;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  orgProfile: {
    imageUrl: '',
    did: '',
    name: '',
    description: '',
  },
  isAuthenticated: false,
};

export const orgSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOrgProfile: (state, action) => {
      state.orgProfile = action.payload;
      state.isAuthenticated = true;
    },
    clearOrgProfile: state => {
      state.orgProfile = initialState.orgProfile;
      state.isAuthenticated = false;
    },
  },
});

export const { setOrgProfile, clearOrgProfile } = orgSlice.actions;

export default orgSlice.reducer;
