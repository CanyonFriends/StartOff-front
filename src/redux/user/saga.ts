import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions } from '.';
import { signinAPI, SigninResponseType, logoutAPI } from '../../api/auth';
import { LoginInfoType } from '../../validator/loginValidator';
import { ErrorType, isFailed } from '../../api/error';
import { setCookie, getCookie, removeCookie } from '../../utils/cookie';
import { RootState } from '../store';
import { getSelfAPI, GetSelfResponse } from '../../api/user';

function* signin(action: PayloadAction<LoginInfoType>) {
  const result: ErrorType | SigninResponseType = yield call(signinAPI, action.payload);
  if (isFailed<SigninResponseType>(result)) {
    yield put(actions.loginFailure({ error_msg: result.error_msg }));
    return;
  }
  yield put(actions.loginSuccess(result));
  setCookie('soca', result.access_token);
  setCookie('socu', result.uuid);
}

function* logout() {
  const accessToken = getCookie('soca');
  const uuid = getCookie('socu');
  const email: string = yield select((state: RootState) => state.user.email);
  yield call(logoutAPI, {
    accessToken,
    uuid,
    email,
  });
  yield put(actions.logoutSuccess());
  removeCookie('soca');
  removeCookie('socu');
}

function* self() {
  const result: ErrorType | GetSelfResponse = yield call(getSelfAPI);
  if (isFailed<GetSelfResponse>(result)) {
    yield put(actions.selfFailure({ error_msg: result.error_msg }));
    return;
  }
  yield put(actions.selfSuccess(result));
}

export function* watchSignin() {
  yield takeLatest(actions.loginRequest.type, signin);
}

export function* watchLogout() {
  yield takeLatest(actions.logoutRequest.type, logout);
}

export function* watchSelf() {
  yield takeLatest(actions.selfRequest.type, self);
}
