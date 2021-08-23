import axios from 'axios';
import { getCookie } from './cookie';

type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE';
interface AxiosRequest {
  method: MethodType;
  url: string;
  data?: any;
}

const request = async ({ data = '', ...request }: AxiosRequest) => {
  const accessToken = getCookie('soca');
  const config = {
    ...request,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
};

export default request;
