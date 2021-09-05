/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import AlertModal from '../AlertModal';

beforeEach(() => {
  document.body.innerHTML = `<div id="modal"></div>`;
});

describe('Component/Organism/AlertModal', () => {
  const handleClickCloseButton = () => {};
  it('성공 모달 렌더링', () => {
    const component = render(<AlertModal isSuccess content="success" clickCloseButton={handleClickCloseButton} />);

    component.getByText('success');
    component.getByLabelText('success-icon');
  });

  it('실패 모달 렌더링', () => {
    const component = render(
      <AlertModal isSuccess={false} content="failure" clickCloseButton={handleClickCloseButton} />,
    );

    component.getByText('failure');
    component.getByLabelText('warning-icon');
  });
});
