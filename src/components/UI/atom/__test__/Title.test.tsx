/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import Title from '../Title';

describe('Component/Atom/Title', () => {
  it('children이 text일 경우', () => {
    const component = render(<Title>shellboy</Title>);

    const text = component.getByText('shellboy');
    expect(text.tagName).toBe('H1');
  });

  it('children이 html tag일 경우', () => {
    const component = render(
      <Title>
        <div>shellboy</div>
      </Title>,
    );

    const text = component.getByText('shellboy');
    expect(text.tagName).toBe('DIV');
  });

  describe('size 테스트', () => {
    it('h1일 경우', () => {
      const component = render(<Title fontsize="h1">shellboy</Title>);

      const title = component.getByText('shellboy');
      expect(title).toHaveStyle({
        fontSize: '4rem',
      });
    });

    it('h2일 경우', () => {
      const component = render(<Title fontsize="h2">shellboy</Title>);

      const title = component.getByText('shellboy');
      expect(title).toHaveStyle({
        fontSize: '3.2rem',
      });
    });

    it('h3일 경우', () => {
      const component = render(<Title fontsize="h3">shellboy</Title>);

      const title = component.getByText('shellboy');
      expect(title).toHaveStyle({
        fontSize: '2.7rem',
      });
    });

    it('h4일 경우', () => {
      const component = render(<Title fontsize="h4">shellboy</Title>);

      const title = component.getByText('shellboy');
      expect(title).toHaveStyle({
        fontSize: '1.8rem',
      });
    });

    it('h5일 경우', () => {
      const component = render(<Title fontsize="h5">shellboy</Title>);

      const title = component.getByText('shellboy');
      expect(title).toHaveStyle({
        fontSize: '1.5rem',
      });
    });

    it('h6일 경우', () => {
      const component = render(<Title fontsize="h6">shellboy</Title>);

      const title = component.getByText('shellboy');
      expect(title).toHaveStyle({
        fontSize: '1.2rem',
      });
    });
  });
});
