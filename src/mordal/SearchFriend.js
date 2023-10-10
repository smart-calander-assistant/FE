import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import './AddFriend.css';
import { styled } from 'styled-components';
import SearchBar from '../component/SearchBar';
import axios from '../api/axios';

export default function SearchFriend({ title, name, setSearchModalOpen }) {
    // 친구찾기모달 : 내용추가필요
    const ref = useRef();
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue('');
    };
    useOnClickOutside(ref, () => {
        setSearchModalOpen(false);
    });

    const handleFriendSearch = async () => {
        try {
            const response = await axios.get('/api/friends');

            if (response.data.isSuccess) {
                console.log('친구 목록조회 성공');
            } else {
                console.log('친구 목록조회 실패:', response.data.message);
            }
        } catch (error) {
            console.error('친구 목록조회 에러:', error);
        }
    };

    return (
        <div className='presentation'>
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                    <div className='modal__content'>
                        <SearchNavigator>
                            <p className='modal__details'>친구검색</p>
                            <span
                                onClick={() => setSearchModalOpen(false)}
                                className='modal-close'
                            >
                                취소
                            </span>
                        </SearchNavigator>
                        <SearchBar
                            value={value}
                            setValue={setValue}
                            type='text'
                            placeholder='친구를 검색해주세요'
                            onSubmit={handleSubmit}
                        />
                        <button onClick={() => handleFriendSearch()}>
                            {' '}
                            친구 목록 조회{' '}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SearchNavigator = styled.div`
    justify-content: center;
`;
