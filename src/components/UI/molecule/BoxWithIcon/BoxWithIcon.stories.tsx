import React, { useState } from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import BoxWithIcon from '.';
import { Input } from '../../atom';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Molecule/BoxWithIcon',
  component: BoxWithIcon,
  decorators: [withKnobs],
};

export const boxWithIconAndOther = (): React.ReactElement => {
  const boxText = text('BOX TEXT', '돌아가기');
  const iconSelect = select('ICON', ['LeftChevron', 'Logo', 'Login', 'Logout'], 'LeftChevron');
  const [value, setValue] = useState('');

  return (
    <StyleWrapper>
      <div style={{ width: '100px' }}>
        <div className="description">with text</div>
        <BoxWithIcon iconProps={{ icon: iconSelect }}>
          <div>{boxText}</div>
        </BoxWithIcon>
      </div>
      <div style={{ width: '100px' }}>
        <div className="description">with input</div>
        <BoxWithIcon iconProps={{ icon: iconSelect }}>
          <Input value={value} onChange={(event) => setValue(event.target.value)} />
        </BoxWithIcon>
      </div>
    </StyleWrapper>
  );
};

export const boxWithIconSortDirection = (): React.ReactElement => {
  const boxText = text('BOX TEXT', '돌아가기');
  const iconSelect = select('ICON', ['LeftChevron', 'Logo', 'Login', 'Logout'], 'LeftChevron');

  return (
    <StyleWrapper>
      <div style={{ width: '100px' }}>
        <div className="description">row</div>
        <BoxWithIcon iconProps={{ icon: iconSelect }} sortDirection="row">
          <div>{boxText}</div>
        </BoxWithIcon>
      </div>
      <div style={{ width: '100px' }}>
        <div className="description">column</div>
        <BoxWithIcon iconProps={{ icon: iconSelect }} sortDirection="column">
          <div>{boxText}</div>
        </BoxWithIcon>
      </div>
    </StyleWrapper>
  );
};
