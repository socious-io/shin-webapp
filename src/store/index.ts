import { configureStore } from '@reduxjs/toolkit';

import { spinnerSlice } from './reducers/spinner.reducer';

const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
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
