import React, { useState } from 'react';
import TextAreaField from '.';
import { LabelProps } from '../../atom/Label';
import { TextAreaProps } from '../../atom/TextArea';
import StyleWrapper from '../../../../style/styleWrapper';

export default {
  title: 'Molecule/TextAreaField',
  component: TextAreaField,
};

export const textareaFieldSort = (): React.ReactElement => {
  const [value, setValue] = useState('');
  const labelProps: LabelProps = {
    size: 'medium',
    content: 'label',
    group: 'group',
  };
  const textareaProps: TextAreaProps = {
    value,
    id: 'group',
    placeholder: 'placeholder',
    onChange: (event) => setValue(event.target.value),
  };
  return (
    <StyleWrapper>
      <div>
        <div className="description">row</div>
        <TextAreaField labelProps={labelProps} textareaProps={textareaProps} />
      </div>
      <div>
        <div className="description">column</div>
        <TextAreaField labelProps={labelProps} textareaProps={textareaProps} sortDirection="column" />
      </div>
    </StyleWrapper>
  );
};
