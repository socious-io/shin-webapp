import { createSlice } from '@reduxjs/toolkit';
import { Identity } from 'src/core/adaptors';

const initState = {
  identity: undefined,
};
export const identitySlice = createSlice({
  name: 'identity',
  initialState: initState as {
    identity?: Identity;
  },
  reducers: {
    setIdentity: (state, action) => {
      state.identity = action.payload;
    },
    removeIdentity: () => {
      return initState;
    },
  },
});

export const { setIdentity, removeIdentity } = identitySlice.actions;
