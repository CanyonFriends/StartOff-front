import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createCommentAPI } from '../comment';
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
});
