import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createCommentAPI, deleteCommentAPI, updateCommentAPI } from '../comment';
import { isFailed } from '../error';
import { makeCommentMock } from '../../__mocks__/server-mock.data';
import { CommentClientType } from '../../@types/client';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('API/comment', () => {
  it('createCommentAPI', async () => {
    const commentMock = makeCommentMock({});
    mock.onPost('/v1/posts/1/comments').reply(200, commentMock);
    const response = await createCommentAPI({
      userId: '1',
      postId: '1',
      content: 'content',
    });

    expect(isFailed<CommentClientType>(response)).toBeFalsy();
    expect(commentMock).toHaveProperty('content', commentMock.content);
  });

  it('createCommentAPI error', async () => {
    mock.onPost('/v1/posts/1/comments').reply(400, { error_msg: 'error' });
    const response = await createCommentAPI({
      userId: '1',
      postId: '1',
      content: 'content',
    });

    expect(isFailed<CommentClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('updateCommentAPI', async () => {
    const commentMock = makeCommentMock({});
    mock.onPut('/v1/posts/1/comments/1').reply(200, commentMock);
    const response = await updateCommentAPI({
      userId: '1',
      postId: '1',
      commentId: '1',
      content: 'content',
    });

    expect(isFailed<CommentClientType>(response)).toBeFalsy();
    expect(commentMock).toHaveProperty('content', commentMock.content);
  });

  it('updateCommentAPI error', async () => {
    mock.onPut('/v1/posts/1/comments/1').reply(400, { error_msg: 'error' });
    const response = await updateCommentAPI({
      userId: '1',
      postId: '1',
      commentId: '1',
      content: 'content',
    });

    expect(isFailed<CommentClientType>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });

  it('deleteCommentAPI', async () => {
    mock.onDelete('v1/posts/1/comments/1').reply(200, true);
    const response = await deleteCommentAPI({ postId: '1', commentId: '1' });

    expect(isFailed<boolean>(response)).toBeFalsy();
    expect(response).toBeTruthy();
  });

  it('deleteCommentAPI error', async () => {
    mock.onDelete('v1/posts/1/comments/1').reply(400, { error_msg: 'error' });
    const response = await deleteCommentAPI({ postId: '1', commentId: '1' });

    expect(isFailed<boolean>(response)).toBeTruthy();
    expect(response).toHaveProperty('error_msg', 'error');
  });
});
