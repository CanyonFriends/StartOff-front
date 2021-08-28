import axios from '../utils/axios';
import { ErrorType } from './error';
import { ProjectType } from '../@types/client';
import { projectClientType2ServerReqeustType, projectServerType2ClientType } from '../converter/project';
import { ProjectServerResponseType } from '../@types/server';

export interface CreateProjectRequest {
  userId: string;
  project: ProjectType;
}

export interface UpdateProjectRequest {
  userId: string;
  projectId: number;
  project: ProjectType;
}

export interface DeleteProjectRequest {
  userId: string;
  projectId: number;
}

export const createProjectAPI = async ({ userId, project }: CreateProjectRequest): Promise<ProjectType | ErrorType> => {
  try {
    const response = await axios({
      method: 'POST',
      url: `/v1/users/${userId}/projects`,
      data: {
        ...projectClientType2ServerReqeustType(project),
      },
    });
    return projectServerType2ClientType(response.data as ProjectServerResponseType);
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const updateProjectAPI = async ({
  userId,
  projectId,
  project,
}: UpdateProjectRequest): Promise<ProjectType | ErrorType> => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `/v1/users/${userId}/projects/${projectId}`,
      data: {
        ...projectClientType2ServerReqeustType(project),
      },
    });
    return projectServerType2ClientType(response.data as ProjectServerResponseType);
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};

export const deleteProjectAPI = async ({ userId, projectId }: DeleteProjectRequest): Promise<boolean | ErrorType> => {
  try {
    await axios({
      method: 'DELETE',
      url: `v1/users/${userId}/projects/${projectId}`,
    });
    return true;
  } catch (error) {
    return { error_msg: error.response.data.error_msg } as ErrorType;
  }
};
