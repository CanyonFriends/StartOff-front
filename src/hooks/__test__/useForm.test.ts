/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useForm from '../useForm';

interface InitialStateType {
  nickname: string;
  age: number;
}

describe('Hooks/useForm', () => {
  const initialState: InitialStateType = { nickname: 'shellboy', age: 24 };

  it('values 테스트', () => {
    const validator = () => '';
    const handleSubmit = async () => '';
    const { result } = renderHook(() => useForm<InitialStateType>({ initialState, validator, onSubmit: handleSubmit }));

    expect(result.current.values).toEqual(initialState);
  });

  it('handleChange 테스트', () => {
    const validator = () => '';
    const handleSubmit = async () => '';
    const { result } = renderHook(() => useForm<InitialStateType>({ initialState, validator, onSubmit: handleSubmit }));

    waitFor(() => {
      const newState = { nickname: 'tallmurf', age: 24 };
      result.current.handleChange(newState);
      expect(result.current.values).toEqual(newState);
    });
  });

  it('submit시 validator에서 에러 발생할 경우', () => {
    const validator = () => 'error';
    const handleSubmit = async () => '';
    const { result } = renderHook(() => useForm<InitialStateType>({ initialState, validator, onSubmit: handleSubmit }));

    waitFor(() => {
      result.current.handleSubmitWithErrorControl();
      expect(result.current.error).toBe('error');
    });
  });

  it('submit시 handleSubmit에서 에러 발생할 경우', () => {
    const validator = () => '';
    const handleSubmit = async () => 'error';
    const { result } = renderHook(() => useForm<InitialStateType>({ initialState, validator, onSubmit: handleSubmit }));

    waitFor(() => {
      result.current.handleSubmitWithErrorControl();
      expect(result.current.error).toBe('error');
    });
  });

  it('에러 발생 후 clearError테스트', () => {
    const validator = () => '';
    const handleSubmit = async () => 'error';
    const { result } = renderHook(() => useForm<InitialStateType>({ initialState, validator, onSubmit: handleSubmit }));

    waitFor(() => {
      result.current.handleSubmitWithErrorControl();
      result.current.clearError();
      expect(result.current.error).toBe('');
    });
  });
});
