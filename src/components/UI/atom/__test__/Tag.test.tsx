/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import Tag from '../Tag';
import theme from '../../../../style/theme';

describe('Component/Atom/Tag', () => {
  it('content 렌더링 테스트', () => {
    const component = render(<Tag id="tag" name="typescript" />);

    component.getByText('typescript');
  });

  it('clickClose', () => {
    let text = 'shellboy';
    const clickEvent = () => {
      text = 'tallmurf';
    };

    const component = render(<Tag id="tag" name="typescript" onClickClose={clickEvent} />);

    const tag = component.getByLabelText('tag');
    fireEvent.click(tag);
    waitFor(() => {
      expect(text).toBe('tallmurf');
    });
  });

  it('색상 테스트', () => {
    const component = render(
      <Tag
        id="tag"
        name="typescript"
        textColor={theme.color.color_brightness_000}
        color={theme.color.color_primary_400}
      />,
    );

    const tag = component.getByLabelText('tag');
    expect(tag).toHaveStyle({
      color: theme.color.color_brightness_000,
      backgroundColor: theme.color.color_primary_400,
    });
  });
});
