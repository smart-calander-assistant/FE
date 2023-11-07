import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import { getAccessToken } from '../localstorage/auth';

const EditPlan = ({
    id,
    start_time,
    end_time,
    place,
    title,
    setEditPlanModalOpen,
}) => {
    const [titleInput, setTitleInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [endTimeInput, setEndTimeInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const accessToken = getAccessToken();

    useEffect(() => {
        // 컴포넌트가 마운트될 때, 기존 정보를 입력 필드에 표시
        setTitleInput(title);
        setStartTimeInput(start_time);
        setEndTimeInput(end_time);
        setPlaceInput(place);
    }, [title, start_time, end_time, place]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editPlan = {
            content: titleInput,
            startTime: startTimeInput,
            endTime: endTimeInput,
            place: placeInput,
            latitude: 0,
            longitude: 0,
        };

        console.log('editPlan:', editPlan);

        try {
            // Axios를 사용하여 PUT 요청을 보냅니다.
            await axios.put(`/plan/${id}`, editPlan, {
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
            setEditPlanModalOpen(false);
        } catch (error) {
            console.error('Plan 수정 중 오류 발생: ', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>Plan 수정하기</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setEditPlanModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList onSubmit={handleSubmit}>
                        <InputLabel>
                            <p>제목</p>
                            <input
                                type='text'
                                placeholder={title}
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>시작날짜</p>
                            <input
                                type='text'
                                placeholder={start_time}
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
                                placeholder={end_time}
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
                                placeholder={place}
                                value={placeInput}
                                onChange={(e) => setPlaceInput(e.target.value)}
                            />
                        </InputLabel>
                        <button type='submit'>Plan 수정하기</button>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default EditPlan;

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
