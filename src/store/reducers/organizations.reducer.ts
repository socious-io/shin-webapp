import { createSlice } from '@reduxjs/toolkit';
import { OrgProfileRes } from 'src/core/adaptors';

import { currentOrganizations } from '../thunks/organizations.thunks';

const initState = { entities: [], status: 'idle', error: null };

export const organizationsSlice = createSlice({
  name: 'identity',
  initialState: initState as { entities: OrgProfileRes[]; status: string; error: any },
  reducers: {
    setOrganizationsList: (state, action) => {
      state.entities = action.payload;
      if (action.payload) state.status = 'succeeded';
    },
    removeOrganizationsList: () => {
      return initState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(currentOrganizations.pending, state => {
        state.status = 'loading';
      })
      .addCase(currentOrganizations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload || [];
      })
      .addCase(currentOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setOrganizationsList, removeOrganizationsList } = organizationsSlice.actions;
