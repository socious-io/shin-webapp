import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export interface NotificationState {
  display: boolean;
  title: string;
  icon?: ReactNode;
}

const initialState: NotificationState = {
  display: false,
  title: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotificationState: (state, action) => {
      state.display = action.payload.display;
      state.title = action.payload.title;
      state.icon = action.payload.icon;
    },
  },
});

export const { setNotificationState } = notificationSlice.actions;
