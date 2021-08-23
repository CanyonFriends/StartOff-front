import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';
import { LoginInfoType } from '../../validator/loginValidator';
import { SigninResponseType } from '../../api/auth';
import { ErrorType } from '../../api/error';
import { GetSelfResponse } from '../../api/user';

// login
export const loginRequest = (state: UserState, _: PayloadAction<LoginInfoType>) => {
  state.error = '';
};

export const loginSuccess = (state: UserState, action: PayloadAction<SigninResponseType>) => {
  state.email = action.payload.email;
  state.nickname = action.payload.nickname;
  state.userId = String(action.payload.user_id);
  state.isSignin = true;
};

export const loginFailure = (state: UserState, action: PayloadAction<ErrorType>) => {
  state.error = action.payload.error_msg;
};

// logout
export const logoutRequest = (_: UserState) => {};

export const logoutSuccess = (state: UserState) => {
  state.email = '';
  state.nickname = '';
  state.userId = '';
  state.isSignin = false;
};

// self
export const selfRequest = (state: UserState) => {
  state.error = '';
};

export const selfSuccess = (state: UserState, action: PayloadAction<GetSelfResponse>) => {
  state.email = action.payload.email;
  state.nickname = action.payload.nickname;
  state.userId = String(action.payload.user_id);
  state.isSignin = true;
};

export const selfFailure = (state: UserState, action: PayloadAction<ErrorType>) => {
  state.isSignin = false;
};
