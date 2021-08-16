import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';
import { LoginInfoType } from '../../validator/loginValidator';
import { SigninResponseType } from '../../api/user';
import { ErrorType } from '../../api/error';

export const loginRequest = (state: UserState, _: PayloadAction<LoginInfoType>) => {
  state.error = '';
};

export const loginSuccess = (state: UserState, action: PayloadAction<SigninResponseType>) => {
  state.email = action.payload.email;
  // state.nickname = action.payload.nickname;
  state.userId = action.payload.user_id;
  state.isSignin = true;
};

export const loginFailure = (state: UserState, action: PayloadAction<ErrorType>) => {
  state.error = action.payload.error;
};
