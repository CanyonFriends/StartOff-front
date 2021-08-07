import { useState } from 'react';

interface UseFormProps<T> {
  initialState: T;
  validator: (value: any) => string;
  onSubmit: (values: any) => string;
}

function useForm<T>({ initialState, validator, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialState);
  const [error, setError] = useState('');

  const handleChange = (value: T) => {
    setValues(value);
  };

  const handleSubmitWithErrorControl = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validator(values);
    setError(error);
    if (!error.length) {
      const error = onSubmit(values);
      setError(error);
    }
  };

  return { values, error, handleChange, handleSubmitWithErrorControl };
}

export default useForm;
