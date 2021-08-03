import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Image from '.';
import StyleWrapper from '../../../../common/styleWrapper';

export default {
  title: 'Atom/Image',
  component: Image,
  decorators: [withKnobs],
};

export const imageSizeByPercent = (): React.ReactElement => {
  const imagePath: string = 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg';
  return (
    <StyleWrapper>
      <div>
        <div className="description">25% x 25%</div>
        <Image width="25%" height="25%" src={imagePath} alt="hello" />
      </div>
      <div>
        <div className="description">50% x 50%</div>
        <Image width="50%" height="50%" src={imagePath} alt="hello" />
      </div>
      <div>
        <div className="description">100% x 100%</div>
        <Image width="100%" height="100%" src={imagePath} alt="hello" />
      </div>
    </StyleWrapper>
  );
};

export const imageSizeByPixel = (): React.ReactElement => {
  const imagePath: string = 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg';
  return (
    <StyleWrapper>
      <div>
        <div className="description">25px x 25px</div>
        <Image width="25px" height="25px" src={imagePath} alt="hello" />
      </div>
      <div>
        <div className="description">50px x 50px</div>
        <Image width="50px" height="50px" src={imagePath} alt="hello" />
      </div>
      <div>
        <div className="description">100px x 100px</div>
        <Image width="100px" height="100px" src={imagePath} alt="hello" />
      </div>
    </StyleWrapper>
  );
};
