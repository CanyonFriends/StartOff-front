/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import Input from '../Input';

let text = 'tallmurf';

beforeEach(() => {
  text = 'tallmurf';
});

describe('Component/Atom/Input', () => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    text = event.target.value;
  };

  it('value, id 테스트', () => {
    const component = render(<Input id="input" value={text} onChange={onChange} />);

    const input = component.getByLabelText('input');
    expect(input).toHaveProperty('value', text);
    expect(input).toHaveProperty('id', 'input');
  });

  it('onChange 테스트', () => {
    const component = render(<Input id="input" value={text} onChange={onChange} />);

    const input = component.getByLabelText('input');
    fireEvent.change(input, { target: { value: 'shellboy' } });
    waitFor(() => {
      expect(input).toHaveProperty('value', 'shellboy');
    });
  });

  it('placeholder 테스트', () => {
    const component = render(<Input id="input" value={text} onChange={onChange} placeholder="안뇽?" />);

    const input = component.getByLabelText('input');
    expect(input).toHaveProperty('placeholder', '안뇽?');
  });

  describe('size 테스트', () => {
    it('small일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} size="small" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveStyle({
        fontSize: '1.5rem',
      });
    });

    it('medium일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} size="medium" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveStyle({
        fontSize: '1.8rem',
      });
    });

    it('large일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} size="large" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveStyle({
        fontSize: '3.2rem',
        fontWeight: 'bold',
      });
    });

    it('extraLarge일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} size="extraLarge" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveStyle({
        fontSize: '4rem',
        fontWeight: 'bold',
      });
    });
  });

  describe('type 테스트', () => {
    it('text일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} type="text" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveProperty('type', 'text');
    });

    it('email일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} type="email" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveProperty('type', 'email');
    });

    it('password일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} type="password" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveProperty('type', 'password');
    });

    it('checkbox일 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} type="checkbox" />);

      const input = component.getByLabelText('input');
      expect(input).toHaveProperty('type', 'checkbox');
    });

    it('checkbox를 체크할 경우', () => {
      const component = render(<Input id="input" value={text} onChange={onChange} type="checkbox" />);

      const input = component.getByLabelText('input');
      fireEvent.click(input);
      waitFor(() => {
        expect(input).toHaveProperty('checked', true);
      });
    });
  });

  it('width 기본값 테스트', () => {
    const component = render(<Input id="input" value={text} onChange={onChange} />);

    const input = component.getByLabelText('input');
    expect(input).toHaveStyle({
      width: '100%',
    });
  });

  it('width 커스텀 테스트', () => {
    const component = render(<Input id="input" value={text} onChange={onChange} width="100px" />);

    const input = component.getByLabelText('input');
    expect(input).toHaveStyle({
      width: '100px',
    });
  });
});
