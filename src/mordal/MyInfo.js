import axios from '../api/axios';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import requests from '../api/requests';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';

export default function MyInfo({ setMyInfoModalOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post(requests.fetchSignup, {
                email,
                password,
            });

            if (response.data.email) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '회원가입에 성공했습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
                console.log('회원가입 성공');
            } else {
                console.log('회원가입 실패:', response.data);
            }
        } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: '이미 가입된 이메일입니다. 다른 이메일을 사용해주세요',
                });
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>내 정보</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setMyInfoModalOpen(false)}
                        />
                    </ModalTitle>
                        <InputList>
                            <InputLabel>
                            <p>이메일</p>
                            <InputBox
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='이메일을 입력해주세요'
                                />
                                </InputLabel>
                            <InputBox
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='비밀번호를 입력해주세요'
                            />
                        <SubmitButton onClick={handleRegister}>
                            회원가입
                        </SubmitButton>
                        </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
}

const ViewContainer = styled.div`
    z-index: 1;
    position: absolute;
`;

const RootContainer = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 30%);
    -webkit-tap-highlight-color: transparent;
    justify-content: center;
    padding: 16rem 1.5rem;
`;

const ModalContainer = styled.div`
    position: relative;
    background: white;
    overflow: hidden;
    border-radius: 0.5rem;
    transition: all 400ms ease-in-out 2s;
    overflow-y: scroll;
    padding: 2rem;
`;

const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    align-items: center;
    color: black;
`;

const ModalDetail = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
`;

const InputList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin-top: 1rem;
`;

const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
    font-size: medium;
    margin: 0.5rem 0;
    gap: 0.5rem;
`;

const InputBox = styled.input`
    border: 0.1rem solid #de496e;
    border-radius: 0.5rem;
    height: 2rem;
    padding: 0 0.5rem;
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