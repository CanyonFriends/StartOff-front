import React from 'react';
import { makePostMock } from '../../__mocks__/client-mock-data';
import PostTemplate from './template';

export default {
  title: 'Template/Post',
  component: PostTemplate,
};

const postMock = makePostMock({});

export const editable = () => <PostTemplate post={postMock} editableAuthority />;
export const unEditable = () => <PostTemplate post={postMock} editableAuthority={false} />;
