import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import './AddFriend.css';
import { styled } from 'styled-components';
import SearchBar from '../component/SearchBar';
import axios from '../api/axios';
import Friend from '../component/Friend';
import requests from '../api/requests';

export default function AddFriend({ title, name, setFriendModalOpen }) {
    // 친구추가모달 : 내용추가필요
    const ref = useRef();
    const [value, setValue] = useState('');
    const [isClickedId, setIsClickedId] = useState();

    const onClick = (id) => {
        setIsClickedId(id);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setValue('');
    };
    useOnClickOutside(ref, () => {
        setFriendModalOpen(false);
    });

    const mock_friend = {
        name: 'add_person',
        profile:
            'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
        id: 1,
    };

    const handleAddFriend = async () => {
        try {
            const response = await axios.get(`${requests.fetchAddFriend}${mock_friend.name}`);

            if (response.data.isSuccess) {
                console.log('친구추가 성공');
            } else {
                console.log('친구추가 실패:', response.data.message);
            }
        } catch (error) {
            console.error('친구추가 에러:', error);
        }
    };
    return (
        <div className='presentation'>
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                    <div className='modal__content'>
                        <SearchNavigator>
                            <p className='modal__details'>친구추가</p>
                            <span
                                onClick={() => setFriendModalOpen(false)}
                                className='modal-close'
                            >
                                취소
                            </span>
                        </SearchNavigator>
                        <SearchBar
                            value={value}
                            setValue={setValue}
                            type='text'
                            placeholder='아이디를 검색해주세요'
                            onSubmit={handleSubmit}
                        />
                        <Friend
                            name={mock_friend.name}
                            profile={mock_friend.profile}
                            id={mock_friend.id}
                            onClick={() => onClick(mock_friend.id)}
                            isClicked={
                                isClickedId === mock_friend.id ? true : false
                            }
                        />
                        <button onClick={() => handleAddFriend()}>
                            친구 추가
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
