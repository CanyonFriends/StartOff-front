import React, { useState } from 'react';
import EditableText from '.';
import StyleWrapper from '../../../../style/styleWrapper';
import { InputProps } from '../../atom/Input';
import { TitleProps } from '../../atom/Title/index';

export default {
  title: 'Molecule/EditableText',
  component: EditableText,
};

export const editableTitle = () => {
  const [value, setValue] = useState('제목이닷');
  const titleProps: TitleProps = {
    fontsize: 'h4',
  };
  const inputProps: InputProps = {
    value,
    onChange: (event) => setValue(event.target.value),
  };

  return (
    <StyleWrapper>
      <div>
        <div className="description">initial</div>
        <EditableText isEditable textType="title" titleProps={titleProps} inputProps={inputProps} />
      </div>
      <div>
        <div className="description">editable</div>
        <EditableText isEditable={false} textType="title" titleProps={titleProps} inputProps={inputProps} />
      </div>
    </StyleWrapper>
  );
};

export const editableText = () => {
  const [value, setValue] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
  const inputProps: InputProps = {
    value,
    size: 'small',
    onChange: (event) => setValue(event.target.value),
  };

  return (
    <StyleWrapper>
      <div>
        <div className="description">initial</div>
        <EditableText isEditable textType="paragraph" inputProps={inputProps} />
      </div>
      <div>
        <div className="description">editable</div>
        <EditableText isEditable={false} textType="paragraph" inputProps={inputProps} />
      </div>
    </StyleWrapper>
  );
};
