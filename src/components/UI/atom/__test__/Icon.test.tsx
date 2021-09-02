/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-utils';
import Icon from '../Icon';

describe('Component/Atom/Icon', () => {
  it('아이콘 종류', () => {
    render(
      <>
        <Icon icon="LeftChevron" />
        <Icon icon="Login" />
        <Icon icon="Logout" />
        <Icon icon="Logo" />
        <Icon icon="Check" />
        <Icon icon="Warning" />
        <Icon icon="Profile" />
        <Icon icon="Pencil" />
        <Icon icon="Disk" />
        <Icon icon="Home" />
        <Icon icon="Plus" />
        <Icon icon="TrashCan" />
        <Icon icon="Search" />
      </>,
    );
  });

  describe('size 테스트', () => {
    it('small일 경우', () => {
      const component = render(<Icon id="icon" icon="Home" size="small" />);

      const icon = component.getByLabelText('icon');
      expect(icon).toHaveStyle({
        width: '3rem',
        height: '3rem',
      });
    });

    it('medium일 경우', () => {
      const component = render(<Icon id="icon" icon="Home" size="medium" />);

      const icon = component.getByLabelText('icon');
      expect(icon).toHaveStyle({
        width: '4rem',
        height: '4rem',
      });
    });

    it('large일 경우', () => {
      const component = render(<Icon id="icon" icon="Home" size="large" />);

      const icon = component.getByLabelText('icon');
      expect(icon).toHaveStyle({
        width: '6rem',
        height: '6rem',
      });
    });

    it('extraLarge일 경우', () => {
      const component = render(<Icon id="icon" icon="Home" size="extraLarge" />);

      const icon = component.getByLabelText('icon');
      expect(icon).toHaveStyle({
        width: '10rem',
        height: '10rem',
      });
    });
  });

  it('onClick 테스트', () => {
    let text = 'shellboy';
    const clickEvent = () => {
      text = 'tallmurf';
    };

    const component = render(<Icon id="icon" icon="Home" onClick={clickEvent} />);
    const icon = component.getByLabelText('icon');
    fireEvent.click(icon);
    expect(text).toBe('tallmurf');
  });
});
