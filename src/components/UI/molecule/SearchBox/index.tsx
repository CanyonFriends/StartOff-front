import React from 'react';
import useForm from '../../../../hooks/useForm';
import { Input, Button, Icon } from '../../atom';
import * as Style from './styled';

interface SearchBoxProps {
  searchSubmit: () => Promise<string>;
}

function SearchBox({ searchSubmit }: SearchBoxProps) {
  const { values, handleChange, handleSubmitWithErrorControl } = useForm<string>({
    initialState: '',
    validator: () => '',
    onSubmit: searchSubmit,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <Style.Form onSubmit={handleSubmitWithErrorControl}>
      <Input width="80%" id="search" value={values} onChange={handleInputChange} placeholder="검색어를 입력해주세요" />
      <Button size="medium">
        검색 <Icon icon="Search" color="white" />
      </Button>
    </Style.Form>
  );
}

export default SearchBox;
