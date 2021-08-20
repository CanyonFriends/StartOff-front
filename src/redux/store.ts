import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { watchSignin, watchLogout, watchSelf } from './user/saga';
import { userReducer } from './user/index';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

function* rootSaga() {
  yield all([fork(watchSignin), fork(watchLogout), fork(watchSelf)]);
}
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
