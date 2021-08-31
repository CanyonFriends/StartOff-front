import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import SigninTemplate from './template';
import AxiosMock from '../../common/AxiosMock';
import { signinSuccessMockInfo, signinFailMockInfo } from '../../__mocks__/client-mock-data';

export default {
  title: 'Template/Signin',
  component: SigninTemplate,
};

export const signinSuccess = (): React.ReactElement => {
  const mock = (apiMock: MockAdapter) => {
    apiMock.onPost('/v1/login').reply(200, signinSuccessMockInfo);
  };

  return (
    <AxiosMock mock={mock}>
      <SigninTemplate />
    </AxiosMock>
  );
};

export const signinFailure = (): React.ReactElement => {
  const mock = (apiMock: MockAdapter) => {
    apiMock.onPost('/v1/login').reply(400, signinFailMockInfo);
  };

  return (
    <AxiosMock mock={mock}>
      <SigninTemplate />
    </AxiosMock>
  );
};
