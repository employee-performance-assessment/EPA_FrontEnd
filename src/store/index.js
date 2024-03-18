import { configureStore } from '@reduxjs/toolkit';
import adminDataSlices from './slices/adminDataSlices';
import isLoggedInSlice from './slices/isLoggedInSlice';
import tokenSlices from './slices/tokenSlices';

export default configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice,
    adminData: adminDataSlices,
    token: tokenSlices
  }
});
