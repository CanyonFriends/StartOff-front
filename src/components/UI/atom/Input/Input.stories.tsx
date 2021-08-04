import React, { useState } from 'react';
import { withKnobs, text as textKnob } from '@storybook/addon-knobs';
import Input from '.';
import Label from '../Label';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Atom/Input',
  component: Input,
  decorators: [withKnobs],
};

export const inputType = (): React.ReactElement => {
  const placeholderText = '';
  const [text, setText] = useState('text');
  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');

  return (
    <StyleWrapper>
      <div>
        <div className="description">placeholder</div>
        <Input type="text" value={placeholderText} onChange={() => {}} placeholder="placeholder" />
      </div>
      <div>
        <div className="description">text</div>
        <Input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      </div>
      <div>
        <div className="description">email</div>
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <div className="description">password</div>
        <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
    </StyleWrapper>
  );
};

export const inputWithLabel = (): React.ReactElement => {
  const [text, setText] = useState('text');
  const label = textKnob('LABEL', 'Label');
  const groupName = 'group';

  return (
    <div>
      <Label group={groupName} content={label} />
      <Input value={text} id={groupName} onChange={(event) => setText(event.target.value)} />
    </div>
  );
};
