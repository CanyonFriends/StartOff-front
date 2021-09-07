/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import PostMarkdownForm from '../PostMarkdownForm';

let markdown = '# shellboy';
beforeEach(() => {
  markdown = '# shellboy';
});

describe('Component/Organism/PostMarkdownForm', () => {
  const handleChangeMarkdownText = (value: string) => {
    markdown = value;
  };
  it('렌더링', () => {
    const component = render(
      <PostMarkdownForm markdown={markdown} handleChangeMarkdownText={handleChangeMarkdownText} />,
    );

    component.getByText('Write');
    component.getByText('Preview');

    const textarea = component.getByLabelText('markdown-textarea');
    component.getByText('shellboy');
    expect(textarea).toHaveProperty('value', '# shellboy');
  });

  it('text change', async () => {
    const component = render(
      <PostMarkdownForm markdown={markdown} handleChangeMarkdownText={handleChangeMarkdownText} />,
    );

    const textarea = component.getByLabelText('markdown-textarea');
    fireEvent.change(textarea, { target: { value: '# tallmurf' } });
    await waitFor(() => {
      expect(markdown).toBe('# tallmurf');
    });
  });
});
