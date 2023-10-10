import React from 'react';
import { styled } from 'styled-components';

const SearchBar = ({ handleSubmit, value, setValue, placeholder }) => {
    // 검색바 컴포넌트
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <SearchContainer onSubmit={handleSubmit}>
            <SearchContent
                type='text'
                name='value'
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <SubmitBox type='submit' value='입력' />
        </SearchContainer>
    );
};

export default SearchBar;

const SearchContainer = styled.form`
    display: flex;
    justify-content: center;
`;

const SearchContent = styled.input`
    background-color: white;
    padding: 0.5rem;
    margin-right: 0.25rem;
    width: 18rem;

    @media (max-width: 18rem) {
        width: 100%;
    }
`;

const SubmitBox = styled.input`
    background-color: white;
    padding: 0.5rem;
    width: 3rem;
    cursor: pointer;

    &:hover {
        background-color: gray;
    }

    @media (max-width: 3rem) {
        width: 100%;
    }
`;
