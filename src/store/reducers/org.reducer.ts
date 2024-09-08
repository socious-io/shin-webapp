import { createSlice } from '@reduxjs/toolkit';
import { OrgProfileRes } from 'src/core/adaptors';

export interface OrgState {
  id: string;
}

const initialState: OrgState = {
  id: '',
};

export const orgSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOrgProfile: (state, action) => {
      state.id = action.payload;
    },
    clearOrgProfile: state => {
      state.id = initialState.id;
    },
  },
});

export const { setOrgProfile, clearOrgProfile } = orgSlice.actions;

export default orgSlice.reducer;
