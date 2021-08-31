import React, { useState } from 'react';
import InputField from '.';
import { LabelProps } from '../../atom/Label/index';
import { InputProps } from '../../atom/Input/index';
import StyleWrapper from '../../../../style/styleWrapper';

export default {
  title: 'Molecule/InputField',
  component: InputField,
};

export const inputFieldSort = (): React.ReactElement => {
  const [value, setValue] = useState('');
  const labelProps: LabelProps = {
    size: 'medium',
    content: 'label',
    group: 'group',
  };
  const inputProps: InputProps = {
    value,
    id: 'group',
    placeholder: 'placeholder',
    onChange: (event) => setValue(event.target.value),
  };
  return (
    <StyleWrapper>
      <div>
        <div className="description">row</div>
        <InputField labelProps={labelProps} inputProps={inputProps} />
      </div>
      <div>
        <div className="description">column</div>
        <InputField labelProps={labelProps} inputProps={inputProps} sortDirection="column" />
      </div>
    </StyleWrapper>
  );
};
