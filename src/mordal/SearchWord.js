import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import './AddFriend.css';
import { styled } from 'styled-components';
import SearchBar from '../component/SearchBar';

export default function SearchWord({ title, name, setWordModalOpen }) {
    // 채팅방 내에 단어검색 : 추가내용필요
    const ref = useRef();
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue('');
    };
    useOnClickOutside(ref, () => {
        setWordModalOpen(false);
    });

    return (
        <div className='presentation'>
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                    <div className='modal__content'>
                        <SearchNavigator>
                            <p className='modal__details'>단어검색</p>
                            <span
                                onClick={() => setWordModalOpen(false)}
                                className='modal-close'
                            >
                                취소
                            </span>
                        </SearchNavigator>
                        <SearchBar
                            value={value}
                            setValue={setValue}
                            type='text'
                            placeholder='단어를 검색해주세요'
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const SearchNavigator = styled.div`
    justify-content: center;
`;
