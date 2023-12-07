import axios from '../api/axios';
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import requests from '../api/requests';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { getAccessToken } from '../localstorage/auth';
import NumberSelector from '../component/NumberSelector';

export default function Weight({ setWeightModalOpen, myWeight, realWeight }) {
    const [deadlineRank, setDeadlineRank] = useState(myWeight.DEADLINE);
    const [priorityRank, setPriorityRank] = useState(myWeight.PRIORITY);
    const [distanceRank, setDistanceRank] = useState(myWeight.DISTANCE);
    const [focusTimeRank, setFocusTimeRank] = useState(myWeight.FOCUS_TIME);
    const [notFocusTimeRank, setNotFocusTimeRank] = useState(
        myWeight.NOT_FOCUS_TIME
    );

    const accessToken = getAccessToken();

    useEffect(() => {
        // myWeight가 변경될 때마다 state 업데이트
        setDeadlineRank(myWeight.DEADLINE);
        setPriorityRank(myWeight.PRIORITY);
        setDistanceRank(myWeight.DISTANCE);
        setFocusTimeRank(myWeight.FOCUS_TIME);
        setNotFocusTimeRank(myWeight.NOT_FOCUS_TIME);
    }, [myWeight]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newWeightInfo = [
                ['DEADLINE', deadlineRank],
                ['PRIORITY', priorityRank],
                ['DISTANCE', distanceRank],
                ['FOCUS_TIME', focusTimeRank],
                ['NOT_FOCUS_TIME', notFocusTimeRank],
            ];

            if (
                deadlineRank +
                    priorityRank +
                    distanceRank +
                    focusTimeRank +
                    notFocusTimeRank ===
                    15 &&
                deadlineRank *
                    priorityRank *
                    distanceRank *
                    focusTimeRank *
                    notFocusTimeRank ===
                    120
            ) {
                for (let i = 0; i < newWeightInfo.length; i++) {
                    await axios.put(
                        `${requests.fetchWeight}/${newWeightInfo[i][0]}`,
                        newWeightInfo[i][1],
                        {
                            headers: {
                                'Content-Type': 'application/problem+json',
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    console.log(newWeightInfo[i][0], newWeightInfo[i][1]);
                }

                setDeadlineRank('');
                setPriorityRank('');
                setDistanceRank('');
                setFocusTimeRank('');
                setNotFocusTimeRank('');

                setWeightModalOpen(false);

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '우선순위 업데이트 성공',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: '우선순위가 모두 달라야 합니다. 다시 시도해주세요.',
                });
            }
        } catch (error) {
            console.error('가중치 업데이트 오류: ', error);
        }
    };

    const handleNumberSelect = (setFunction, rank) => {
        setFunction(rank);
        console.log(`Selected number: ${rank}`);
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>추천 우선순위 설정</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setWeightModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        <InputLabel>
                            <WeightContainer>
                                <p>마감기한</p>
                                <WeightBox>{realWeight.DEADLINE}</WeightBox>
                            </WeightContainer>
                            <NumberSelector
                                onSelect={(rank) =>
                                    handleNumberSelect(setDeadlineRank, rank)
                                }
                                number={5}
                                defaultNumber={deadlineRank}
                            />
                        </InputLabel>
                        <InputLabel>
                            <WeightContainer>
                                <p>중요도</p>
                                <WeightBox>{realWeight.PRIORITY}</WeightBox>
                            </WeightContainer>
                            <NumberSelector
                                onSelect={(rank) =>
                                    handleNumberSelect(setPriorityRank, rank)
                                }
                                number={5}
                                defaultNumber={priorityRank}
                            />
                        </InputLabel>
                        <InputLabel>
                            <WeightContainer>
                                <p>일정 간의 이동시간</p>
                                <WeightBox>{realWeight.DISTANCE}</WeightBox>
                            </WeightContainer>
                            <NumberSelector
                                onSelect={(rank) =>
                                    handleNumberSelect(setDistanceRank, rank)
                                }
                                number={5}
                                defaultNumber={distanceRank}
                            />
                        </InputLabel>
                        <InputLabel>
                            <WeightContainer>
                                <p>집중 잘되는 시간</p>
                                <WeightBox>{realWeight.FOCUS_TIME}</WeightBox>
                            </WeightContainer>
                            <NumberSelector
                                onSelect={(rank) =>
                                    handleNumberSelect(setFocusTimeRank, rank)
                                }
                                number={5}
                                defaultNumber={focusTimeRank}
                            />
                        </InputLabel>
                        <InputLabel>
                            <WeightContainer>
                                <p>집중 안되는 시간</p>
                                <WeightBox>
                                    {realWeight.NOT_FOCUS_TIME}
                                </WeightBox>
                            </WeightContainer>
                            <NumberSelector
                                onSelect={(rank) =>
                                    handleNumberSelect(
                                        setNotFocusTimeRank,
                                        rank
                                    )
                                }
                                number={5}
                                defaultNumber={notFocusTimeRank}
                            />
                        </InputLabel>
                        <SubmitButton onClick={handleSubmit}>
                            저장하기
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
    padding: 12vh 1.5rem;
`;

const ModalContainer = styled.div`
    position: relative;
    background: white;
    border-radius: 0.5rem;
    transition: all 400ms ease-in-out 2s;
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

    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
    max-height: 60vh;

    &::-webkit-scrollbar {
        width: 5px;
    }

    /* &::-webkit-scrollbar-thumb {
      background-color: gray;
      border-radius: 1rem;
  } */

    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;

const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
    font-size: medium;
    margin: 0.5rem 0;
    gap: 0.5rem;
`;

const WeightContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WeightBox = styled.div`
    display: flex;
    padding: 0.5rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
    justify-content: center;
    background-color: #a9def9;

    width: 2.5rem;
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
