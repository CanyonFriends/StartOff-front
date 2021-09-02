/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import Paragraph from '../Paragraph';

describe('Component/Atom/Paragraph', () => {
  it('content 렌더링 테스트', () => {
    const component = render(<Paragraph content="shellboy" />);

    component.getByText('shellboy');
  });

  describe('size 테스트', () => {
    it('small일 경우', () => {
      const component = render(<Paragraph id="paragraph" content="shellboy" size="small" />);

      const paragraph = component.getByLabelText('paragraph');
      expect(paragraph).toHaveStyle({
        fontSize: '1.5rem',
      });
    });

    it('medium일 경우', () => {
      const component = render(<Paragraph id="paragraph" content="shellboy" size="medium" />);

      const paragraph = component.getByLabelText('paragraph');
      expect(paragraph).toHaveStyle({
        fontSize: '1.8rem',
      });
    });

    it('large일 경우', () => {
      const component = render(<Paragraph id="paragraph" content="shellboy" size="large" />);

      const paragraph = component.getByLabelText('paragraph');
      expect(paragraph).toHaveStyle({
        fontSize: '2.1rem',
      });
    });

    it('extraLarge일 경우', () => {
      const component = render(<Paragraph id="paragraph" content="shellboy" size="extraLarge" />);

      const paragraph = component.getByLabelText('paragraph');
      expect(paragraph).toHaveStyle({
        fontSize: '2.4rem',
      });
    });
  });
});
