/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import TextAreaField from '../TextAreaField';
import { LabelProps } from '../../atom/Label/index';
import { TextAreaProps } from '../../atom/TextArea/index';

describe('Component/Molecule/TextAreaField', () => {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {};
  const labelProps: LabelProps = {
    id: 'label',
    content: 'nickname',
  };
  const textareaProps: TextAreaProps = {
    onChange,
    ariaLabel: 'textarea',
    value: 'tallmurf',
  };

  it('textarea, label렌더링 테스트', () => {
    const component = render(
      <TextAreaField ariaLabel="textareafield" textareaProps={textareaProps} labelProps={labelProps} />,
    );

    component.getByText('nickname');
    component.getByLabelText('label');
    component.getByLabelText('textarea');
    const componentField = component.getByLabelText('textareafield');
    expect(componentField.getElementsByTagName('textarea').length).toBe(1);
    expect(componentField.getElementsByTagName('label').length).toBe(1);
  });

  it('group 테스트', () => {
    const component = render(
      <TextAreaField ariaLabel="textareafield" group="group" textareaProps={textareaProps} labelProps={labelProps} />,
    );

    const label = component.getByLabelText('label');
    const textarea = component.getByLabelText('textarea');

    expect(label).toHaveProperty('htmlFor', 'group');
    expect(textarea).toHaveProperty('id', 'group');
  });

  it('정렬 방향이 row일 경우', () => {
    const component = render(
      <TextAreaField
        ariaLabel="textareafield"
        sortDirection="row"
        textareaProps={textareaProps}
        labelProps={labelProps}
      />,
    );

    const componentField = component.getByLabelText('textareafield');
    expect(componentField).toHaveStyle({
      flexDirection: 'row',
    });
  });

  it('정렬 방향이 column일 경우', () => {
    const component = render(
      <TextAreaField
        ariaLabel="textareafield"
        sortDirection="column"
        textareaProps={textareaProps}
        labelProps={labelProps}
      />,
    );

    const componentField = component.getByLabelText('textareafield');
    expect(componentField).toHaveStyle({
      flexDirection: 'column',
    });
  });
});
