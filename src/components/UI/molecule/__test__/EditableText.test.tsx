/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '../../../../test-utils';
import { InputProps } from '../../atom/Input';
import EditableText from '../EditableText';

describe('Component/Molecule/EditableText', () => {
  const onChange = () => {};
  const inputProps: InputProps = {
    id: 'input',
    value: 'shellboy',
    onChange,
  };

  it('제목이면서 수정 불가능한 경우', () => {
    const component = render(<EditableText isEditable={false} textType="title" inputProps={inputProps} />);

    const title = component.getByText('shellboy');
    expect(title.tagName).toBe('H1');
  });

  it('제목이면서 수정 가능한 경우', () => {
    const component = render(<EditableText isEditable textType="title" inputProps={inputProps} />);

    const title = component.getByLabelText('input');
    expect(title).toHaveProperty('value', 'shellboy');
  });

  it('문장이면서 수정 불가능한 경우', () => {
    const component = render(<EditableText isEditable={false} textType="paragraph" inputProps={inputProps} />);

    const title = component.getByText('shellboy');
    expect(title.tagName).toBe('P');
  });

  it('문장이면서 수정 가능한 경우', () => {
    const component = render(<EditableText isEditable textType="paragraph" inputProps={inputProps} />);

    const title = component.getByLabelText('input');
    expect(title).toHaveProperty('value', 'shellboy');
  });
});
