import { configureStore } from '@reduxjs/toolkit';

import { notificationSlice } from './reducers/notification.reducer';
import { organizationsSlice } from './reducers/organizations.reducer';
import { spinnerSlice } from './reducers/spinner.reducer';
import { userSlice } from './reducers/user.reducer';

const store = configureStore({
  reducer: {
    spinner: spinnerSlice.reducer,
    notification: notificationSlice.reducer,
    organizations: organizationsSlice.reducer,
    user: userSlice.reducer,
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
