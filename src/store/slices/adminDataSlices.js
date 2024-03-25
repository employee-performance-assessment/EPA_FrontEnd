import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminData: {},
};

const adminDataSlices = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    setAdminData(state, action) {
      state.adminData = action.payload;
    },
  },
});

export const { setAdminData } = adminDataSlices.actions;
export default adminDataSlices.reducer;
