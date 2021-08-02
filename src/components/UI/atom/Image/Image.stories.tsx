import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Image from '.';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Atom/Image',
  component: Image,
  decorators: [withKnobs],
};

export const image100x100 = (): React.ReactElement => {
  const imagePath: string = 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg';
  const h: string = '100%';
  const w: string = '100%';
  return (
    <StyleWrapper>
      <div>
        <div className="description">100*100</div>
        <Image width={h} height={w} src={imagePath} alt="hello" />
      </div>
    </StyleWrapper>
  );
};
