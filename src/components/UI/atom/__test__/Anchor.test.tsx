/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import Anchor from '../Anchor';

describe('Component/Atom/Anchor', () => {
  it('children이 text일 경우', () => {
    const component = render(<Anchor to="/">shellboy</Anchor>);

    const text = component.getByText('shellboy');
    expect(text.tagName).toBe('A');
  });

  it('children이 html tag일 경우', () => {
    const component = render(
      <Anchor to="/">
        <div>shellboy</div>
      </Anchor>,
    );

    const text = component.getByText('shellboy');
    expect(text.tagName).toBe('DIV');
  });

  it('size가 small일 경우', () => {
    const component = render(
      <Anchor id="anchor" to="/" size="small">
        shellboy
      </Anchor>,
    );

    const anchor = component.getByLabelText('anchor');
    expect(anchor).toHaveStyle({ fontSize: '1.6rem' });
  });

  it('size가 medium일 경우', () => {
    const component = render(
      <Anchor id="anchor" to="/" size="medium">
        shellboy
      </Anchor>,
    );

    const anchor = component.getByLabelText('anchor');
    expect(anchor).toHaveStyle({ fontSize: '2rem' });
  });

  it('size가 large일 경우', () => {
    const component = render(
      <Anchor id="anchor" to="/" size="large">
        shellboy
      </Anchor>,
    );

    const anchor = component.getByLabelText('anchor');
    expect(anchor).toHaveStyle({ fontSize: '3rem' });
  });

  it('size가 extraLarge 경우', () => {
    const component = render(
      <Anchor id="anchor" to="/" size="extraLarge">
        shellboy
      </Anchor>,
    );

    const anchor = component.getByLabelText('anchor');
    expect(anchor).toHaveStyle({ fontSize: '4rem' });
  });

  it('link 경로 테스트', () => {
    const component = render(
      <Anchor id="anchor" to="/anchor" size="extraLarge">
        shellboy
      </Anchor>,
    );

    const anchor = component.getByText('shellboy').closest('a');
    expect(anchor).toHaveAttribute('href', '/anchor');
  });
});
