import { configureStore } from '@reduxjs/toolkit';
import adminDataSlices from './slices/adminDataSlice';
import isLoggedInSlice from './slices/isLoggedInSlice';
import tokenSlices from './slices/tokenSlices';
import viewMarksSlices from './slices/viewMarksSlices';

export default configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice,
    adminData: adminDataSlices,
    token: tokenSlices,
    viewMarks: viewMarksSlices,
  },
});
