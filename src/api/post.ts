import axios from '../utils/axios';
import { ErrorType } from './error';

export const getCategoriesAPI = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/v1/categories',
    });

    return response.data as string[];
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
