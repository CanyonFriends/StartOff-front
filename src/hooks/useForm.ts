import { useState } from 'react';

interface UseFormProps<T> {
  initialState: T;
  validator: (value: any) => string;
  onSubmit: (values: any) => Promise<string>;
}

function useForm<T>({ initialState, validator, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialState);
  const [error, setError] = useState('');

  const handleChange = (value: T) => {
    setValues(value);
  };

  const handleSubmitWithErrorControl = async (event?: React.FormEvent<HTMLFormElement>, beforeSubmit?: any) => {
    if (event) event.preventDefault();

    const error = validator(values);
    setError(error);
    if (!error.length) {
      if (beforeSubmit) beforeSubmit();
      const error = await onSubmit(values);
      if (error) setError(error);
    }
    return !error;
  };

  const clearError = () => {
    setError('');
  };

  return { values, error, clearError, handleChange, handleSubmitWithErrorControl };
}

export default useForm;
