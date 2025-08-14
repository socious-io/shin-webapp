import { configureStore } from '@reduxjs/toolkit';

import { identitySlice } from './reducers/identity.reducer';
import { loadingSlice } from './reducers/loading.reducer';
import { notificationSlice } from './reducers/notification.reducer';
import { userSlice } from './reducers/user.reducer';

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    notification: notificationSlice.reducer,
    identity: identitySlice.reducer,
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
