import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import SigninTemplate from '.';
import AxiosMock from '../../../utils/AxiosMock';
import { makeSigninSuccessInfoMock, makeErrorMock } from '../../../__mocks__/client-mock-data';

export default {
  title: 'Template/Signin',
  component: SigninTemplate,
};

export const signinSuccess = (): React.ReactElement => {
  const mock = (apiMock: MockAdapter) => {
    apiMock.onPost('/v1/login').reply(200, makeSigninSuccessInfoMock);
  };

  return (
    <AxiosMock mock={mock}>
      <SigninTemplate />
    </AxiosMock>
  );
};

export const signinFailure = (): React.ReactElement => {
  const mock = (apiMock: MockAdapter) => {
    apiMock.onPost('/v1/login').reply(400, makeErrorMock({}));
  };

  return (
    <AxiosMock mock={mock}>
      <SigninTemplate />
    </AxiosMock>
  );
};
