import { ErrorType } from '../api/error';

export const signinFailMockInfo: Promise<ErrorType> = new Promise((res) => {
  res({
    error: '에러 발생',
  });
});
