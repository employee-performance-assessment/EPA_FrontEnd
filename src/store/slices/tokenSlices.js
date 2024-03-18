import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenSlices: '',
};

const tokenSlices = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    }
  }
});

export const { setToken } = tokenSlices.actions;
export default tokenSlices.reducer;
