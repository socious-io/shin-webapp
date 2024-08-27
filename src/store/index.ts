import { configureStore } from '@reduxjs/toolkit';

import { identitySlice } from './reducers/identity.reducer';
import { languageSlice } from './reducers/language.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';

const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
    language: languageSlice.reducer,
    identity: identitySlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modals/openModal'],
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
