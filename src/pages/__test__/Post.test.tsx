/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor } from '@testing-library/react';
import { render } from '../../test-utils';
import Post from '../Post';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<Post> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<Post />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });
});
