import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './reducer';
import { UserState } from './types';

export const initialState: UserState = {
  userId: '',
  nickname: '',
  email: '',
  error: '',
  isSignin: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers,
});

export const userReducer = userSlice.reducer;
export const { actions } = userSlice;
