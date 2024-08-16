import { createSlice } from '@reduxjs/toolkit';

interface langState {
  language: 'en' | 'jp';
}

const initialState = {
  language: 'jp',
} as langState;

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.items;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
