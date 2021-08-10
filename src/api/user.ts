import axios from 'axios';
import { SignupInfoType } from '../validator/signupValidator';

// FIXME: 백엔드쪽 api구현이 완료되지않아 추후 수정 필요
export const signupAPI = async ({ id, pw, nickname }: SignupInfoType) => {
  const response = await axios({
    method: 'POST',
    url: '/v1/signup',
    data: {
      nickname,
      email: id,
      password: pw,
    },
  });
  return response;
};
