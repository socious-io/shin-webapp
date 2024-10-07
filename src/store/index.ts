import { configureStore } from '@reduxjs/toolkit';

import { languageSlice } from './reducers/language.reducer';
import { notificationSlice } from './reducers/notification.reducer';
import { orgSlice } from './reducers/org.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';
import { userSlice } from './reducers/user.reducer';

const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
    language: languageSlice.reducer,
    user: userSlice.reducer,
    org: orgSlice.reducer,
    notification: notificationSlice.reducer,
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
