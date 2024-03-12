import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUSES } from '../constants';

const mockValues = {
  id: '1234',
  role: 'admin',
  firstName: 'Джек',
  lastName: 'Воробей',
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: REQUEST_STATUSES.idle, // 'idle' | 'pending' | 'fulfilled' | 'rejected';
    user: mockValues,
  },
  reducers: {},
});

export default userSlice;
