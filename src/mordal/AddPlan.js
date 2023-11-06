import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import requests from '../api/requests';
import { getAccessToken } from '../localstorage/auth';

const AddPlan = ({ setAddPlanModalOpen }) => {

    const [titleInput, setTitleInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [endTimeInput, setEndTimeInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const accessToken = getAccessToken();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlan = {
            content: titleInput,
            startTime: startTimeInput,
            endTime: endTimeInput,
            place: placeInput,
            latitude: 0,
            longitude: 0,
        };

        console.log('newPlan:', newPlan);

        try {
            // Axios를 사용하여 POST 요청을 보냅니다.
            await axios.post(requests.fetchPlan, newPlan, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });
            
            // 입력값 초기화
            setTitleInput('');
            setStartTimeInput('');
            setEndTimeInput('');
            setPlaceInput('');

            // 모달 닫기
            setAddPlanModalOpen(false);

        } catch (error) {
            console.error('Plan 추가 중 오류 발생: ', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>Plan 추가하기</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setAddPlanModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList onSubmit={handleSubmit}>
                        <InputLabel>
                            <p>제목</p>
                            <input
                                type='text'
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>시작날짜</p>
                            <input
                                type='text'
                                value={startTimeInput}
                                onChange={(e) =>
                                    setStartTimeInput(e.target.value)
                                }
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>종료날짜</p>
                            <input
                                type='text'
                                value={endTimeInput}
                                onChange={(e) =>
                                    setEndTimeInput(e.target.value)
                                }
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>장소</p>
                            <input
                                type='text'
                                value={placeInput}
                                onChange={(e) => setPlaceInput(e.target.value)}
                            />
                        </InputLabel>
                        <button type='submit'>Plan 추가하기</button>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default AddPlan;

const ViewContainer = styled.div`
    z-index: 1;
    position: absolute;
`;

const RootContainer = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 30%);
    -webkit-tap-highlight-color: transparent;
    display: flex;
    justify-content: center;
    padding: 6rem 3rem;
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

const InputList = styled.form`
    display: flex;
    flex-direction: column;

    margin: 1rem 0;
`;

const InputLabel = styled.label`
    display: flex;
    gap: 1rem;
    height: 4rem;
    justify-content: cetner;
`;
