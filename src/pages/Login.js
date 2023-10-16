import React, { useState } from 'react';
import { styled } from 'styled-components';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import smart_assistant from './../img/smart_assistant.png';
import axios from '../api/axios';
import Register from '../mordal/Register';
import requests from '../api/requests';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loginEnabled, setLoginEnabled] = useState(false);
    const [isEncrypted, setIsEncrypted] = useState(true);
    const [registermodalOpen, setRegisterModalOpen] = useState(false);

    const handleRegister = () => {
        setRegisterModalOpen(true);
    };
    // ID입력
    const handleIdChange = (event) => {
        const newId = event.target.value;
        setId(newId);
        checkLoginConditions(newId, password);
    };

    // Password입력
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        checkLoginConditions(id, newPassword);
    };

    // 간단한 로그인조건 (향후 추가가능)
    const checkLoginConditions = (id, pwd) => {
        if (id.length > 0 && pwd.length >= 4) {
            setLoginEnabled(true);
        } else {
            setLoginEnabled(false);
        }
    };

    // 비밀번호 안보이게 설정
    const handleEncryptedPassword = (boolean) => {
        setIsEncrypted(boolean);
    };

    // 백엔드와 데이터통신(아직확인불가)
    const handleLogin = async () => {
        try {
            const response = await axios.post(requests.fetchLogin, {
                id,
                password,
            });

            if (response.data.isSuccess) {
                console.log('로그인 성공');
            } else {
                console.log('로그인 실패:', response.data.message);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get(requests.fetchLogout);

            if (response.data.isSuccess) {
                console.log('로그아웃 성공');
            } else {
                console.log('로그아웃 실패:', response.data.message);
            }
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return (
        <LoginContainer>
            <InputContainer>
                <ImageContainer>
                    <img
                        src={smart_assistant}
                        style={{
                            width: '15rem',
                            height: '10rem',
                        }}
                    />
                </ImageContainer>
                <IdContainer
                    value={id}
                    onChange={handleIdChange}
                    placeholder={'아이디'}
                />
                <PasswordContainer
                    value={password}
                    type={isEncrypted ? 'password' : 'text'}
                    onChange={handlePasswordChange}
                    placeholder={'비밀번호'}
                />
                <EncryptedIconContainer>
                    {isEncrypted && (
                        <IoEyeOffOutline
                            size={'1rem'}
                            onClick={() => handleEncryptedPassword(false)}
                            cursor='pointer'
                        />
                    )}
                    {!isEncrypted && (
                        <IoEyeOutline
                            size={'1rem'}
                            onClick={() => handleEncryptedPassword(true)}
                            cursor='pointer'
                        />
                    )}
                    <span style={{ fontSize: '0.7rem', fontWeight: '100' }}>
                        {isEncrypted && '비밀번호 가리기'}
                        {!isEncrypted && '비밀번호 보기'}
                    </span>
                </EncryptedIconContainer>
                <LoginButton
                    enabled={loginEnabled}
                    onClick={({ id, password }) => handleLogin()}
                >
                    로그인
                </LoginButton>
                {/* <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton> */}
                <OtherContainer>
                    <SignInBox onClick={() => handleRegister()}>
                        회원가입
                    </SignInBox>
                    {registermodalOpen && (
                        <Register setRegisterModalOpen={setRegisterModalOpen} />
                    )}
                    <FindBox>아이디/비밀번호 찾기</FindBox>
                </OtherContainer>
            </InputContainer>
        </LoginContainer>
    );
}

const LoginContainer = styled.div`
    background-color: #0acf83;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 15rem;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const IdContainer = styled.input`
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    height: 2rem;
    border-bottom-color: #f4f4f4;
    border-bottom-width: 0.01rem;
    font-size: 0.7rem;
    font-weight: 100;
    text-indent: 0.5rem;
    padding-right: 0.5rem;
`;

const PasswordContainer = styled(IdContainer)`
    border: none;
`;

const EncryptedIconContainer = styled.div`
    display: flex;
    height: 2rem;
    align-items: center;
    justify-content: right;
    gap: 0.25rem;
`;

const LoginButton = styled.button`
    height: 2.5rem;
    border: none;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 100;
    color: ${({ enabled }) => (enabled ? 'white' : 'gray')};
    background-color: ${({ enabled }) => (enabled ? '#3A86FF' : 'white')};
    cursor: ${({ enabled }) => (enabled ? 'pointer' : 'default')};

    &:active {
        opacity: ${({ enabled }) => (enabled ? 0.7 : 1)};
    }
`;

const LogoutButton = styled.button`
    height: 2.5rem;
    border: none;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 100;
    color: white;
    background-color: #391b1b;
    cursor: pointer;

    &:active {
        opacity: ${({ enabled }) => (enabled ? 0.7 : 1)};
    }
`;

const OtherContainer = styled.div`
    font-weight: 100;
    font-size: 0.7rem;

    display: flex;
`;

const SignInBox = styled.span`
    width: 40%;
    text-align: center;
    cursor: pointer;
`;

const FindBox = styled(SignInBox)`
    width: 60%;
`;
