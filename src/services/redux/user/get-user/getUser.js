import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';

const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/user/`);
    const result = await response.json();

    if (!result?.user?.id) {
      rejectWithValue('No user data');
    }
    return result;
  }
);

export default getUser;
