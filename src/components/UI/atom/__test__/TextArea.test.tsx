/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import TextArea from '../TextArea';

let text = 'tallmurf';

beforeEach(() => {
  text = 'tallmurf';
});

describe('Component/Atom/TextArea', () => {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    text = event.target.value;
  };

  it('value, id테스트', () => {
    const component = render(<TextArea id="textarea" value={text} onChange={onChange} />);

    const textarea = component.getByLabelText('textarea');
    expect(textarea).toHaveProperty('value', text);
    expect(textarea).toHaveProperty('id', 'textarea');
  });

  it('onChange 테스트', () => {
    const component = render(<TextArea id="textarea" value={text} onChange={onChange} />);

    const textarea = component.getByLabelText('textarea');
    fireEvent.change(textarea, { target: { value: 'shellboy' } });
    waitFor(() => {
      expect(textarea).toHaveProperty('value', 'shellboy');
    });
  });

  it('placeholder 테스트', () => {
    const component = render(<TextArea id="textarea" value={text} onChange={onChange} placeholder="안뇽!" />);

    const textarea = component.getByLabelText('textarea');
    expect(textarea).toHaveProperty('placeholder', '안뇽!');
  });

  describe('size 테스트', () => {
    it('small일 경우', () => {
      const component = render(<TextArea id="textarea" value={text} onChange={onChange} size="small" />);

      const textarea = component.getByLabelText('textarea');
      expect(textarea).toHaveStyle({
        fontSize: '1.5rem',
      });
    });

    it('medium일 경우', () => {
      const component = render(<TextArea id="textarea" value={text} onChange={onChange} size="medium" />);

      const textarea = component.getByLabelText('textarea');
      expect(textarea).toHaveStyle({
        fontSize: '1.8rem',
      });
    });

    it('large일 경우', () => {
      const component = render(<TextArea id="textarea" value={text} onChange={onChange} size="large" />);

      const textarea = component.getByLabelText('textarea');
      expect(textarea).toHaveStyle({
        fontSize: '3.2rem',
      });
    });

    it('extraLarge일 경우', () => {
      const component = render(<TextArea id="textarea" value={text} onChange={onChange} size="extraLarge" />);

      const textarea = component.getByLabelText('textarea');
      expect(textarea).toHaveStyle({
        fontSize: '4rem',
      });
    });
  });
});
