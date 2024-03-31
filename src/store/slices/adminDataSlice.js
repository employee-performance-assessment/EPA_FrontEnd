import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const adminDataSlices = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    setAdminData(state, action) {
      return action.payload;
    },
  },
});

export const { setAdminData } = adminDataSlices.actions;
export default adminDataSlices.reducer;
