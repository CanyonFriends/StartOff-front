import axios from '../utils/axios';
import { ErrorType } from './error';
import { ProjectType } from '../@types/client';
import { projectClientType2ServerReqeustType } from '../converter/project';

export interface CreateProjectRequest {
  userId: string;
  project: ProjectType;
}

export const createProjectAPI = async ({ userId, project }: CreateProjectRequest) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `/v1/users/${userId}/projects`,
      data: {
        ...projectClientType2ServerReqeustType(project),
      },
    });
    return response.data as ProjectType;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
