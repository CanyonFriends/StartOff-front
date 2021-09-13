import React from 'react';
import CommentTemplate from '.';
import { makeCommentMock } from '../../../../__mocks__/client-mock-data';

export default {
  title: 'Organism/CommentTemplate',
  component: CommentTemplate,
};

const commentMock = makeCommentMock({});

export const editable = (): React.ReactElement => <CommentTemplate editableAuthority comment={commentMock} />;

export const uneditable = (): React.ReactElement => <CommentTemplate editableAuthority={false} comment={commentMock} />;
