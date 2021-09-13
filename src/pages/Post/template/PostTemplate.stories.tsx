import React from 'react';
import { makePostMock } from '../../../__mocks__/client-mock-data';
import PostTemplate from '.';

export default {
  title: 'Template/Post',
  component: PostTemplate,
};

const postMock = makePostMock({});

export const editable = () => <PostTemplate post={postMock} userId="1" editableAuthority />;
export const unEditable = () => <PostTemplate post={postMock} userId="1" editableAuthority={false} />;
