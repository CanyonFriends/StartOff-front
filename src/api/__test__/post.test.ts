import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { makeBoardMock, makePostMock } from '../../__mocks__/server-mock.data';
import { getCategoriesAPI, getPostsAPI, createPostAPI, deletePostAPI, updatePostAPI, getPostAPI } from '../post';
import { isFailed } from '../error';
import { BoardClientType, PostClientType } from '../../@types/client';
import { makeCreatePost } from '../../__mocks__/client-mock-data';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/post', () => {
  it('getCategoriesAPI', async () => {
    mock.onGet('/v1/categories').reply(200, ['study', 'category']);
    const response = await getCategoriesAPI();

    expect(isFailed<string[]>(response)).toBeFalsy();
    expect(response).toHaveLength(2);
    expect(response).toContain('study');
    expect(response).toContain('category');
  });

  it('getCategoriesAPI error', async () => {
    mock.onGet('/v1/categories').reply(400, { error_msg: 'error' });
    const response = await getCategoriesAPI();

    expect(isFailed<string[]>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('getPostsAPI', async () => {
    const serverResponseValue = makeBoardMock({});
    mock.onGet('/v1/posts?page=0&size=1&category=board').reply(200, serverResponseValue);
    const response = await getPostsAPI(0, 1, 'board');

    expect(isFailed<BoardClientType>(response)).toBeFalsy();

    if (isFailed<BoardClientType>(response)) throw Error;
    expect(response).toHaveProperty('totalElements', 1);
    expect(response).toHaveProperty('totalPages', 1);
    expect(response.content).toHaveLength(1);
    expect(response.content[0]).toHaveProperty('title', serverResponseValue.content[0].title);
    expect(response.content[0]).toHaveProperty('postId', String(serverResponseValue.content[0].post_id));
    expect(response.content[0]).toHaveProperty('currentPeople', serverResponseValue.content[0].current_people);
    expect(response.content[0]).toHaveProperty('maxPeople', serverResponseValue.content[0].max_people);
    expect(response.content[0]).toHaveProperty('nickname', serverResponseValue.content[0].nickname);
    expect(response.content[0]).toHaveProperty('createAt', new Date(serverResponseValue.content[0].created_at));
  });

  it('getPostsAPI error', async () => {
    mock.onGet('/v1/posts?page=0&size=1&category=board').reply(400, { error_msg: 'error' });
    const response = await getPostsAPI(0, 1, 'board');

    expect(isFailed<BoardClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('createPostAPI', async () => {
    const serverResponseValue = makePostMock({});
    mock.onPost('/v1/posts').reply(200, serverResponseValue);

    const response = await createPostAPI(makeCreatePost({}));

    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('createPostAPI error', async () => {
    mock.onPost('/v1/posts').reply(400, { error_msg: 'error' });

    const response = await createPostAPI(makeCreatePost({}));

    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('deletePostAPI', async () => {
    mock.onDelete('/v1/posts/1').reply(200, true);

    const response = await deletePostAPI('1');

    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('deletePostAPI error', async () => {
    mock.onDelete('/v1/posts/1').reply(400, { error_msg: 'error' });

    const response = await deletePostAPI('1');

    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updatePostAPI', async () => {
    const serverResponseValue = makePostMock({});
    mock.onPut('/v1/posts/1').reply(200, serverResponseValue);

    const response = await updatePostAPI('1', makeCreatePost({}));

    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('updatePostAPI error', async () => {
    mock.onPut('/v1/posts/1').reply(400, { error_msg: 'error' });

    const response = await updatePostAPI('1', makeCreatePost({}));

    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('getPostAPI', async () => {
    const serverResponseValue = makePostMock({});
    mock.onGet('/v1/posts/1').reply(200, serverResponseValue);

    const response = await getPostAPI('1');

    expect(isFailed<PostClientType>(response)).toBeFalsy();
    expect(response).toHaveProperty('postId', String(serverResponseValue.post_id));
    expect(response).toHaveProperty('category', serverResponseValue.category);
    expect(response).toHaveProperty('title', serverResponseValue.title);
    expect(response).toHaveProperty('content', serverResponseValue.content);
    expect(response).toHaveProperty('createdAt', new Date(serverResponseValue.created_at));
    expect(response).toHaveProperty('currentPeople', serverResponseValue.current_people);
    expect(response).toHaveProperty('maxPeople', serverResponseValue.max_people);
    expect(response).toHaveProperty('nickname', serverResponseValue.nickname);
  });

  it('getPostAPI error', async () => {
    mock.onGet('/v1/posts/1').reply(400, { error_msg: 'error' });

    const response = await getPostAPI('1');
    expect(isFailed<PostClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
