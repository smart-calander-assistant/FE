import React from 'react';
import styled from 'styled-components';

const SelectContent = ({ onChange, day }) => {
    const numbers = Array.from({ length: 2 }, (_, index) => 7 * (index + 1)); // 3부터 14까지의 숫자 생성

    return (
        <SelectBox onChange={(e) => onChange(e.target.value)} value={day}>
            {numbers.map((number) => (
                <SelectOption key={number} value={number}>
                    {number}일
                </SelectOption>
            ))}
        </SelectBox>
    );
};

export default SelectContent;

const SelectBox = styled.select`
    display: flex;
    height: 2rem;
    max-width: 11.3rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;

const SelectOption = styled.option``;
