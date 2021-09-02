/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import theme from '../../../../style/theme';
import { render } from '../../../../test-utils';
import Button from '../Button';

describe('Component/Atom/Button', () => {
  it('children이 text일 경우', () => {
    const component = render(<Button>shellboy</Button>);

    const text = component.getByText('shellboy');
    expect(text.tagName).toBe('BUTTON');
  });

  it('children이 html tag일 경우', () => {
    const component = render(
      <Button>
        <div>shellboy</div>
      </Button>,
    );

    const text = component.getByText('shellboy');
    expect(text.tagName).toBe('DIV');
  });

  describe('size 테스트', () => {
    it('small일 경우', () => {
      const component = render(
        <Button id="button" size="small">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        height: '2.5rem',
        fontSize: '1.2rem',
        padding: '0 0.7rem',
      });
    });

    it('medium일 경우', () => {
      const component = render(
        <Button id="button" size="medium">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        height: '3.5rem',
        fontSize: '1.5rem',
        padding: '0 1rem',
      });
    });

    it('large일 경우', () => {
      const component = render(
        <Button id="button" size="large">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        height: '4.6rem',
        fontSize: '2rem',
        padding: '0 1.5rem',
      });
    });

    it('extraLarge일 경우', () => {
      const component = render(
        <Button id="button" size="extraLarge">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        height: '5.6rem',
        fontSize: '3rem',
        padding: '0 2rem',
      });
    });
  });

  describe('theme 테스트', () => {
    it('primary일 경우', async () => {
      const component = render(
        <Button id="button" theme="primary">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        color: theme.color.color_brightness_900,
        backgroundColor: theme.color.color_primary_400,
      });
    });

    it('secondary일 경우', async () => {
      const component = render(
        <Button id="button" theme="secondary">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        color: theme.color.color_primary_400,
        backgroundColor: theme.color.color_primary_300,
      });
    });

    it('github일 경우', async () => {
      const component = render(
        <Button id="button" theme="github">
          shellboy
        </Button>,
      );

      const button = component.getByLabelText('button');
      expect(button).toHaveStyle({
        color: theme.color.color_brightness_900,
        backgroundColor: theme.color.color_brightness_000,
      });
    });
  });

  it('link 버튼인 경우', () => {
    const component = render(<Button to="/button">shellboy</Button>);

    const aTag = component.getByText('shellboy');
    expect(aTag.tagName).toBe('A');
  });

  it('onClick 테스트', () => {
    let text = 'shellboy';
    const clickEvent = () => {
      text = 'tallmurf';
    };

    const component = render(
      <Button id="button" onClick={clickEvent}>
        shellboy
      </Button>,
    );

    const button = component.getByLabelText('button');
    fireEvent.click(button);
    expect(text).toBe('tallmurf');
  });
});
