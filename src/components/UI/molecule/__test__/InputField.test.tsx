/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import InputField from '../InputField';
import { LabelProps } from '../../atom/Label/index';
import { InputProps } from '../../atom/Input/index';

describe('Component/Molecule/InputField', () => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const labelProps: LabelProps = {
    id: 'label',
    content: 'nickname',
  };
  const inputProps: InputProps = {
    onChange,
    id: 'input',
    value: 'tallmurf',
  };

  it('input, label렌더링 테스트', () => {
    const component = render(<InputField ariaLabel="inputfield" inputProps={inputProps} labelProps={labelProps} />);

    component.getByText('nickname');
    component.getByLabelText('label');
    component.getByLabelText('input');
    const componentField = component.getByLabelText('inputfield');
    expect(componentField.getElementsByTagName('input').length).toBe(1);
    expect(componentField.getElementsByTagName('label').length).toBe(1);
  });

  it('group 테스트', () => {
    const component = render(
      <InputField ariaLabel="inputfield" group="group" inputProps={inputProps} labelProps={labelProps} />,
    );

    const componentField = component.getByLabelText('inputfield');
    expect(componentField.getElementsByTagName('input').item(0)).toHaveProperty('id', 'group');
    expect(componentField.getElementsByTagName('label').item(0)).toHaveProperty('htmlFor', 'group');
  });

  it('정렬 방향이 row일 경우', () => {
    const component = render(
      <InputField ariaLabel="inputfield" sortDirection="row" inputProps={inputProps} labelProps={labelProps} />,
    );

    const componentField = component.getByLabelText('inputfield');
    expect(componentField).toHaveStyle({
      flexDirection: 'row',
    });
  });

  it('정렬 방향이 column일 경우', () => {
    const component = render(
      <InputField ariaLabel="inputfield" sortDirection="column" inputProps={inputProps} labelProps={labelProps} />,
    );

    const componentField = component.getByLabelText('inputfield');
    expect(componentField).toHaveStyle({
      flexDirection: 'column',
    });
  });
});
