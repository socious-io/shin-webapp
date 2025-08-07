import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrgProfileRes, OrgsRes } from 'src/core/adaptors';

import { currentIdentities } from '../thunks/identity.thunks';

type StateType = { entities: OrgProfileRes[]; currentId: string; status: string; error: any };

const initialState: StateType = {
  entities: [],
  currentId: '',
  status: 'idle',
  error: null,
};

export const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    setIdentityList: (state, action: PayloadAction<OrgsRes>) => {
      state.entities = action.payload.entities;
      state.currentId = action.payload.currentId;
      state.status = 'succeeded';
    },
    setCurrentIdentityId: (state, action) => {
      state.currentId = action.payload;
    },
    removeIdentityList: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(currentIdentities.pending, state => {
        state.status = 'loading';
      })
      .addCase(currentIdentities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload?.entities || [];
        state.currentId = action.payload?.currentId || '';
      })
      .addCase(currentIdentities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIdentityList, removeIdentityList } = identitySlice.actions;
