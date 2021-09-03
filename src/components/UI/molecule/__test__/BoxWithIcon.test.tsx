/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import { IconProps } from '../../atom/Icon';
import BoxWithIcon from '../BoxWithIcon';

describe('Component/Molecule/BoxWithIcon', () => {
  const iconProps: IconProps = {
    id: 'icon',
    icon: 'Home',
  };
  it('children이 text일 경우', () => {
    const component = render(<BoxWithIcon iconProps={iconProps}>shellboy</BoxWithIcon>);

    const text = component.getByText('shellboy');
    component.getByLabelText('icon');
    expect(text.tagName).toBe('DIV');
  });

  it('children이 html tag일 경우', () => {
    const component = render(
      <BoxWithIcon iconProps={iconProps}>
        <span>shellboy</span>
      </BoxWithIcon>,
    );

    const text = component.getByText('shellboy');
    component.getByLabelText('icon');
    expect(text.tagName).toBe('SPAN');
  });

  it('isContinuous가 true인 경우', () => {
    const component = render(
      <BoxWithIcon ariaLabel="boxwithicon" isContinuous iconProps={iconProps}>
        shellboy
      </BoxWithIcon>,
    );

    const boxWithIcon = component.getByLabelText('boxwithicon');
    expect(boxWithIcon).toHaveStyle({
      justifyContent: '',
    });
  });

  it('isContinuous가 false인 경우', () => {
    const component = render(
      <BoxWithIcon ariaLabel="boxwithicon" isContinuous={false} iconProps={iconProps}>
        shellboy
      </BoxWithIcon>,
    );

    const boxWithIcon = component.getByLabelText('boxwithicon');
    expect(boxWithIcon).toHaveStyle({
      justifyContent: 'space-between',
    });
  });

  it('정렬 방향이 row일 경우', () => {
    const component = render(
      <BoxWithIcon ariaLabel="boxwithicon" sortDirection="row" iconProps={iconProps}>
        shellboy
      </BoxWithIcon>,
    );

    const boxWithIcon = component.getByLabelText('boxwithicon');
    expect(boxWithIcon).toHaveStyle({
      flexDirection: 'row',
    });
  });

  it('정렬 방향이 row일 경우', () => {
    const component = render(
      <BoxWithIcon ariaLabel="boxwithicon" sortDirection="column" iconProps={iconProps}>
        shellboy
      </BoxWithIcon>,
    );

    const boxWithIcon = component.getByLabelText('boxwithicon');
    expect(boxWithIcon).toHaveStyle({
      flexDirection: 'column',
    });
  });

  it('iconPosition이 좌측일 경우', () => {
    const component = render(
      <BoxWithIcon ariaLabel="boxwithicon" iconPosition="left" iconProps={iconProps}>
        shellboy
      </BoxWithIcon>,
    );

    const children = component.getByText('shellboy');
    expect(children.nextSibling).toBeNull();
  });

  it('iconPosition이 우측일 경우', () => {
    const component = render(
      <BoxWithIcon ariaLabel="boxwithicon" iconPosition="right" iconProps={iconProps}>
        <span>shellboy</span>
      </BoxWithIcon>,
    );

    const children = component.getByText('shellboy');
    expect(children.nextSibling).not.toBeNull();
  });
});
