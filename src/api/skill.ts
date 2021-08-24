import axios from '../utils/axios';
import { ErrorType } from './error';
import { SkillServerType } from '../@types/server';
import { skillServerType2ClientType } from '../converter/skill';
import { SkillType } from '../@types/client';

export const getSkillsAPI = async (): Promise<SkillType[] | ErrorType> => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/v1/skills`,
    });

    return (response.data as SkillServerType[]).map((skill) => skillServerType2ClientType(skill));
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
