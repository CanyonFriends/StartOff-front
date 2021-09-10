import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createProjectAPI, deleteProjectAPI, updateProjectAPI } from '../project';
import { makeProjectMock as makeProjectClientMock } from '../../__mocks__/client-mock-data';
import { makeProjectResponseMock } from '../../__mocks__/server-mock.data';
import { ProjectClientType } from '../../@types/client';
import { isFailed } from '../error';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/project', () => {
  it('createProjectAPI', async () => {
    const serverResponseValue = makeProjectResponseMock({});
    mock.onPost('/v1/users/1/projects').reply(200, serverResponseValue);

    const response = await createProjectAPI({ userId: '1', project: makeProjectClientMock({}) });
    expect(isFailed<ProjectClientType>(response)).toBeFalsy();

    if (isFailed<ProjectClientType>(response)) throw Error();
    expect(response).toHaveProperty('content', serverResponseValue.content);
    expect(response).toHaveProperty('title', serverResponseValue.title);
    expect(response).toHaveProperty('deployUrl', serverResponseValue.deploy_url);
    expect(response).toHaveProperty('endDate', new Date(serverResponseValue.end_date));
    expect(response).toHaveProperty('startDate', new Date(serverResponseValue.start_date));
    expect(response).toHaveProperty('githubUrl', serverResponseValue.github_url);
    expect(response).toHaveProperty('id', serverResponseValue.id);
    expect(response).toHaveProperty('introduce', serverResponseValue.introduce);
    expect(response.projectSklls).toHaveLength(serverResponseValue.project_skills.length);
  });

  it('createProjectAPI error', async () => {
    mock.onPost('/v1/users/1/projects').reply(400, { error_msg: 'error' });

    const response = await createProjectAPI({ userId: '1', project: makeProjectClientMock({}) });
    expect(isFailed<ProjectClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updateProjectAPI', async () => {
    const serverResponseValue = makeProjectResponseMock({});
    mock.onPut('/v1/users/1/projects/1').reply(200, serverResponseValue);

    const response = await updateProjectAPI({ userId: '1', projectId: 1, project: makeProjectClientMock({}) });

    if (isFailed<ProjectClientType>(response)) throw Error();
    expect(isFailed<ProjectClientType>(response)).toBeFalsy();
    expect(response).toHaveProperty('content', serverResponseValue.content);
    expect(response).toHaveProperty('title', serverResponseValue.title);
    expect(response).toHaveProperty('deployUrl', serverResponseValue.deploy_url);
    expect(response).toHaveProperty('endDate', new Date(serverResponseValue.end_date));
    expect(response).toHaveProperty('startDate', new Date(serverResponseValue.start_date));
    expect(response).toHaveProperty('githubUrl', serverResponseValue.github_url);
    expect(response).toHaveProperty('id', serverResponseValue.id);
    expect(response).toHaveProperty('introduce', serverResponseValue.introduce);
    expect(response.projectSklls).toHaveLength(serverResponseValue.project_skills.length);
  });

  it('updateProjectAPI error', async () => {
    mock.onPut('/v1/users/1/projects/1').reply(400, { error_msg: 'error' });

    const response = await updateProjectAPI({ userId: '1', projectId: 1, project: makeProjectClientMock({}) });
    expect(isFailed<ProjectClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('deleteProjectAPI', async () => {
    mock.onDelete('/v1/users/1/projects/1').reply(200, true);

    const response = await deleteProjectAPI({ userId: '1', projectId: 1 });
    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('deleteProjectAPI error', async () => {
    mock.onDelete('/v1/users/1/projects/1').reply(400, { error_msg: 'error' });

    const response = await deleteProjectAPI({ userId: '1', projectId: 1 });
    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
