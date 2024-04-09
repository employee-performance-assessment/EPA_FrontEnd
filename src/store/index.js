import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import isLoggedInSlice from './slices/isLoggedInSlice';
import tokenSlices from './slices/tokenSlices';
import filterSlice from './slices/filterSlice';
import viewMarksSlices from './slices/viewMarksSlices';
import isAppreciatedSlices from './slices/isAppreciatedSlices';

export default configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice,
    user: userSlice,
    token: tokenSlices,
    filter: filterSlice,
    viewMarks: viewMarksSlices,
    isAppreciated: isAppreciatedSlices,
  },
});
