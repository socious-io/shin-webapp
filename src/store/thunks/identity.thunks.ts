import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrganizationsAdaptor } from 'src/core/adaptors';

export const currentIdentities = createAsyncThunk('identity/currentIdentities', async () => {
  const { error, data: currentOrganizations } = await getOrganizationsAdaptor();
  if (error) throw error;
  return currentOrganizations;
});
