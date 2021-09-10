/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../../test-utils';
import ModalWrapper from '../ModalWrapper';

beforeEach(() => {
  document.body.innerHTML = `<div id="modal"></div>`;
});

describe('Component/Organism/ModalWrapper', () => {
  const handleClick = () => {};

  it('렌더링', () => {
    const component = render(<ModalWrapper clickModalOutside={handleClick}>hello</ModalWrapper>);

    component.getByLabelText('overlay');
    const modal = component.getByText('hello');
    expect(modal).toHaveStyle({
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 2000,
    });
  });

  it('blur 테스트', () => {
    const component = render(
      <ModalWrapper isBlur clickModalOutside={handleClick}>
        hello
      </ModalWrapper>,
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
    const component = render(<ModalWrapper clickModalOutside={handleClick}>hello</ModalWrapper>);

    const overlay = component.getByLabelText('overlay');
    await waitFor(() => {
      fireEvent.click(overlay);
      expect(text).toBe('shellboy');
    });
  });
});
