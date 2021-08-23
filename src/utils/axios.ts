import axios from 'axios';

type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE';
interface AxiosRequest {
  method: MethodType;
  url: string;
  data?: any;
}

const request = async ({ data = '', ...request }: AxiosRequest) => {
  const accessToken = localStorage.getItem('soca');

  const config = {
    ...request,
    data,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  };

  const response = await axios(config);
  return response;
};

export default request;
