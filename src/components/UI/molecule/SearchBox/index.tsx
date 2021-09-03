import React from 'react';
import useForm from '../../../../hooks/useForm';
import { Input, Button, Icon } from '../../atom';
import { AlertModal } from '../../organism';
import * as Style from './styled';

interface SearchBoxProps {
  searchSubmit: (value: string) => Promise<string>;
}

function SearchBox({ searchSubmit }: SearchBoxProps) {
  const { values, handleChange, error, clearError, handleSubmitWithErrorControl } = useForm<string>({
    initialState: '',
    validator: () => '',
    onSubmit: searchSubmit,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <>
      {!!error && <AlertModal content={error} clickCloseButton={clearError} />}
      <Style.Form onSubmit={handleSubmitWithErrorControl}>
        <Input
          width="80%"
          id="search-input"
          value={values}
          onChange={handleInputChange}
          placeholder="검색어를 입력해주세요"
        />
        <Button size="medium">
          검색 <Icon id="search-icon" icon="Search" color="white" />
        </Button>
      </Style.Form>
    </>
  );
}

export default SearchBox;
