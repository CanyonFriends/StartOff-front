import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import TextArea from '.';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Atom/TextArea',
  component: TextArea,
  decorators: [withKnobs],
};

export const TextAreawithPlaceholder = (): React.ReactElement => {
  const [text, setText] = useState('text');
  return (
    <StyleWrapper>
      <div>
        <div className="description">Textbox 10 x 30</div>
<<<<<<< HEAD
        <TextArea
          rows={10}
          cols={30}
          placeholder="placeholder"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div>
        <div className="description">Textbox 5 x 10</div>
        <TextArea
          rows={5}
          cols={10}
          placeholder="placeholder"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
=======
        <TextArea rows={10} cols={30} placeholder="placeholder" onChange={(event) => setText(event.target.value)} />
      </div>
      <div>
        <div className="description">Textbox 5 x 10</div>
        <TextArea rows={5} cols={10} placeholder="placeholder" onChange={(event) => setText(event.target.value)} />
>>>>>>> e60cf4174859cc4fde4fb32b10471d2c633f6008
      </div>
    </StyleWrapper>
  );
};

export const TextAreawithoutPlaceholder = (): React.ReactElement => {
  const [text, setText] = useState('text');
  return (
    <StyleWrapper>
      <div>
        <div className="description">TextArea 10 x 30</div>
<<<<<<< HEAD
        <TextArea rows={10} cols={30} value={text} onChange={(event) => setText(event.target.value)} />
      </div>
      <div>
        <div className="description">TextArea 5 x 10</div>
        <TextArea rows={5} cols={10} value={text} onChange={(event) => setText(event.target.value)} />
=======
        <TextArea rows={10} cols={30} onChange={(event) => setText(event.target.value)} />
      </div>
      <div>
        <div className="description">TextArea 5 x 10</div>
        <TextArea rows={5} cols={10} onChange={(event) => setText(event.target.value)} />
>>>>>>> e60cf4174859cc4fde4fb32b10471d2c633f6008
      </div>
    </StyleWrapper>
  );
};
