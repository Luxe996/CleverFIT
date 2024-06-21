import { RootState } from '@redux/configure-store';

export const feedbackSelector = (state: RootState) => state.feedbacks;
export const authSelector = (state: RootState) => state.auth;
export const appSelector = (state: RootState) => state.app;
export const calendarSelector = (state: RootState) => state.calendar;
export const userSelector = (state: RootState) => state.user;
export const settingSelector = (state: RootState) => state.settings;
export const trainingsSelector = (state: RootState) => state.trainigs;
