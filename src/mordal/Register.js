import axios from '../api/axios';
import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import './AddFriend.css';
import { styled } from 'styled-components';
import requests from '../api/requests';

export default function Register({ setRegisterModalOpen }) {
    const ref = useRef();

    useOnClickOutside(ref, () => {
        setRegisterModalOpen(false);
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post(requests.fetchRegister, {
                email,
                password,
            });

            if (response.data.isSuccess) {
                console.log('회원가입 성공');
            } else {
                console.log('회원가입 실패:', response.data.message);
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <div className='presentation'>
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                    <div className='modal__content'>
                        <SearchNavigator>
                            <p className='modal__details'>회원가입</p>
                            <span
                                onClick={() => setRegisterModalOpen(false)}
                                className='modal-close'
                            >
                                취소
                            </span>
                        </SearchNavigator>
                        <div>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='이메일'
                            />
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='비밀번호'
                            />
                            <button onClick={handleRegister}>회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SearchNavigator = styled.div`
    justify-content: center;
`;
