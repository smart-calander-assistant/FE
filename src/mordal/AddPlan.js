import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { TodoContext, ADD_PLANNED_ITEM } from '../context/TodoContext';
import axios from '../api/axios';

const AddPlan = ({ setAddPlanModalOpen }) => {
    const { state, dispatch } = useContext(TodoContext);

    const [titleInput, setTitleInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [endTimeInput, setEndTimeInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlan = {
            id: state.plannedItems.length + 1,
            title: titleInput,
            start_time: startTimeInput,
            end_time: endTimeInput,
            place: placeInput,
        };

        try {
            // Axios를 사용하여 POST 요청을 보냅니다.
            const response = await axios.post('/plan', newPlan);

            // 성공적으로 요청이 완료되면 전역 상태를 업데이트
            dispatch({ type: ADD_PLANNED_ITEM, payload: response.data });

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
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input
                                type='text'
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </label>
                        <label>
                            시작날짜:
                            <input
                                type='text'
                                value={startTimeInput}
                                onChange={(e) =>
                                    setStartTimeInput(e.target.value)
                                }
                            />
                        </label>
                        <label>
                            종료날짜:
                            <input
                                type='text'
                                value={endTimeInput}
                                onChange={(e) =>
                                    setEndTimeInput(e.target.value)
                                }
                            />
                        </label>
                        <label>
                            장소:
                            <input
                                type='text'
                                value={placeInput}
                                onChange={(e) => setPlaceInput(e.target.value)}
                            />
                        </label>
                        <button type='submit'>저장</button>
                    </form>
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
`