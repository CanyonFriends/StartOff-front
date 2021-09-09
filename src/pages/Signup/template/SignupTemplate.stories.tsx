import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import SignupTemplate from '.';
import AxiosMock from '../../../utils/AxiosMock';
import { signupSuccessMockInfo, signupFailMockInfo } from '../../../__mocks__/client-mock-data';

export default {
  title: 'Template/Signup',
  component: SignupTemplate,
};

export const signupSuccess = (): React.ReactElement => {
  const mock = (apiMock: MockAdapter) => {
    apiMock.onPost('/v1/signup').reply(200, signupSuccessMockInfo);
  };

  return (
    <AxiosMock mock={mock}>
      <SignupTemplate />
    </AxiosMock>
  );
};

export const signupFailure = (): React.ReactElement => {
  const mock = (apiMock: MockAdapter) => {
    apiMock.onPost('/v1/signup').reply(400, signupFailMockInfo);
  };

  return (
    <AxiosMock mock={mock}>
      <SignupTemplate />
    </AxiosMock>
  );
};
