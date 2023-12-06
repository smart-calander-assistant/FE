import React, { useState } from 'react';
import styled from 'styled-components';
import requests from '../api/requests';
import { getAccessToken } from '../localstorage/auth';
import axios from '../api/axios';
import Swal from 'sweetalert2';

const SelectCategory = ({ onChange, categoryList }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [change, setChange] = useState(false);

    const accessToken = getAccessToken();

    const handleSelectChange = (e) => {
        const selected = e.target.value;
        setSelectedCategory(selected);

        // "직접입력" 옵션을 선택한 경우, 입력 폼을 나타내도록 설정
        if (selected === '직접입력') {
            setCustomCategory('');
        } else {
            onChange(selected);
        }
    };

    const handleCustomInputChange = (e) => {
        const inputCategory = e.target.value;
        setCustomCategory(inputCategory);
    };

    const handleSubmit = async () => {
        try {
            if (categoryList.includes(customCategory)) {
                Swal.fire({
                    icon: 'error',
                    text: '중복된 카테고리입니다',
                });
                throw new Error('category값이 중복입니다.');
            }
            
            if (customCategory === '') {
                Swal.fire({
                    icon: 'error',
                    text: '카테고리를 입력해주세요',
                });
                throw new Error('category값 없습니다.');
            }

            const newCategory = { name: customCategory };
            await axios.post(requests.fetchCategory, newCategory, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '카테고리 추가',
                showConfirmButton: false,
                timer: 1000,
            });
            onChange(customCategory);
            setChange(true);
        } catch (error) {
            console.error('Category 설정 문제: ', error);
        }
    };

    return (
        <div>
            {selectedCategory !== '직접입력' && (
                <SelectBox
                    onChange={handleSelectChange}
                    value={selectedCategory}
                >
                    <SelectOption value='' disabled hidden>
                        카테고리를 선택해주세요
                    </SelectOption>
                    {categoryList.map((item) => (
                        <SelectOption key={item} value={item}>
                            {item}
                        </SelectOption>
                    ))}
                    <SelectOption value='직접입력'>직접입력</SelectOption>
                </SelectBox>
            )}
            {selectedCategory === '직접입력' && change === false && (
                <CategoryBox>
                    <CustomInput
                        type='text'
                        placeholder='직접 입력'
                        value={customCategory}
                        onChange={handleCustomInputChange}
                    />
                    <SubmitButton onClick={handleSubmit}>추가</SubmitButton>
                </CategoryBox>
            )}
            {change === true && <div>{customCategory}</div>}
        </div>
    );
};

export default SelectCategory;

const SelectBox = styled.select`
    display: flex;
    height: 2rem;
    max-width: 15rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
    margin-bottom: 1rem;
`;

const SelectOption = styled.option``;

const CustomInput = styled.input`
    height: 2rem;
    max-width: 11.3rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;

const CategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubmitButton = styled.button`
    background-color: #0acf83;
    color: black;
    font-size: large;
    border: 0.1rem solid #0acf83;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    &:hover {
        opacity: 0.7;
    }
`;
