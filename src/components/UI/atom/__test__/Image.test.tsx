/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import Image from '../Image';

const srcURL = 'https://source.com';

describe('Component/Atom/Image', () => {
  it('src 테스트', () => {
    const component = render(<Image id="image" src={srcURL} />);

    const image = component.getByLabelText('image').closest('img');
    expect(image).toHaveAttribute('src', srcURL);
  });

  it('alt 테스트', () => {
    const component = render(<Image id="image" src={srcURL} alt="src" />);

    const image = component.getByLabelText('image').closest('img');
    expect(image).toHaveAttribute('alt', 'src');
  });

  it('width, height 기본값 테스트', () => {
    const component = render(<Image id="image" src={srcURL} />);

    const image = component.getByLabelText('image');
    expect(image).toHaveStyle({
      width: 'fit-content',
      height: 'fit-content',
    });
  });

  it('width, height 커스텀 테스트', () => {
    const component = render(<Image id="image" src={srcURL} width="90%" height="70%" />);

    const image = component.getByLabelText('image');
    expect(image).toHaveStyle({
      width: '90%',
      height: '70%',
    });
  });
});
