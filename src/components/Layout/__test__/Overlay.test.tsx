/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../../test-utils';
import Overlay from '../Overlay';

beforeEach(() => {
  document.body.innerHTML = `<div id="modal"></div>`;
});

describe('Component/Layout/Overlay', () => {
  const handleClick = () => {};

  it('렌더링 테스트', () => {
    const component = render(<Overlay clickOverlay={handleClick}>hello</Overlay>);

    component.getByLabelText('overlay');
    component.getByText('hello');
  });

  it('blur테스트', () => {
    const component = render(
      <Overlay isBlur clickOverlay={handleClick}>
        hello
      </Overlay>,
    );

    const overlay = component.getByLabelText('overlay');
    expect(overlay).toHaveStyle({
      opacity: 0.1,
    });
  });

  it('onClick 테스트', async () => {
    let text = '';
    const handleClick = () => {
      text = 'shellboy';
    };
    const component = render(
      <Overlay isBlur clickOverlay={handleClick}>
        hello
      </Overlay>,
    );

    const overlay = component.getByLabelText('overlay');
    await waitFor(() => {
      fireEvent.click(overlay);
      expect(text).toBe('shellboy');
    });
  });
});
