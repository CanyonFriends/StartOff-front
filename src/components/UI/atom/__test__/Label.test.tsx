/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import Label from '../Label';

describe('Component/Atom/Label', () => {
  it('content 렌더링', () => {
    const component = render(<Label content="shellboy" />);

    component.getByText('shellboy');
  });

  describe('size 테스트', () => {
    it('small일 경우', () => {
      const component = render(<Label id="label" content="shellboy" size="small" />);

      const label = component.getByLabelText('label');
      expect(label).toHaveStyle({
        fontSize: '1.5rem',
      });
    });

    it('medium일 경우', () => {
      const component = render(<Label id="label" content="shellboy" size="medium" />);

      const label = component.getByLabelText('label');
      expect(label).toHaveStyle({
        fontSize: '1.8rem',
      });
    });

    it('large일 경우', () => {
      const component = render(<Label id="label" content="shellboy" size="large" />);

      const label = component.getByLabelText('label');
      expect(label).toHaveStyle({
        fontSize: '2.1rem',
      });
    });

    it('extraLarge일 경우', () => {
      const component = render(<Label id="label" content="shellboy" size="extraLarge" />);

      const label = component.getByLabelText('label');
      expect(label).toHaveStyle({
        fontSize: '2.7rem',
      });
    });
  });

  it('border 테스트', () => {
    const component = render(<Label bolder id="label" content="shellboy" size="extraLarge" />);

    const label = component.getByLabelText('label');
    expect(label).toHaveStyle({
      fontWeight: 'bolder',
    });
  });
});
