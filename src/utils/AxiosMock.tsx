import React, { useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

interface IProps {
  children: React.ReactNode;
  mock: (adapter: MockAdapter) => void;
}

const apiMock = new MockAdapter(axios);

function axiosMock({ children, mock }: IProps) {
  useEffect(() => {
    mock(apiMock);

    return () => {
      apiMock.reset();
    };
  });
  return <>{children}</>;
}

export default axiosMock;
