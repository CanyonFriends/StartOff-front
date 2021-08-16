import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '.';
import { signinAPI, SigninResponseType } from '../../api/user';
import { LoginInfoType } from '../../validator/loginValidator';
import { ErrorType, isFailed } from '../../api/error';
import { setCookie } from '../../utils/cookie';

function* signin(action: PayloadAction<LoginInfoType>) {
  const result: ErrorType | SigninResponseType = yield call(signinAPI, action.payload);
  if (isFailed<SigninResponseType>(result)) {
    yield put(actions.loginFailure({ error: result.error }));
    return;
  }
  yield put(actions.loginSuccess(result));
  setCookie('soc', result.access_token);
}

export function* watchSignin() {
  yield takeLatest(actions.loginRequest.type, signin);
}
