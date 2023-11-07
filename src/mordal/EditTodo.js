import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import { getAccessToken } from '../localstorage/auth';

const EditTodo = ({
    id,
    deadline,
    priority,
    place,
    title,
    setEditTodoModalOpen,
}) => {
    const [titleInput, setTitleInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [priorityInput, setPriorityInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const accessToken = getAccessToken();

    useEffect(() => {
        // 컴포넌트가 마운트될 때, 기존 정보를 입력 필드에 표시
        setTitleInput(title);
        setDeadlineInput(deadline);
        setPriorityInput(priority);
        setPlaceInput(place);
    }, [title, deadline, priority, place]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editTodo = {
            content: titleInput,
            deadline: deadlineInput,
            priority: priorityInput,
            place: placeInput,
            latitude: 0,
            longitude: 0,
        };

        console.log('editTodo:', editTodo);

        try {
            // Axios를 사용하여 PUT 요청을 보냅니다.
            await axios.put(`/todo/${id}`, editTodo, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });

            // 입력값 초기화
            setTitleInput('');
            setDeadlineInput('');
            setPriorityInput('');
            setPlaceInput('');

            // 모달 닫기
            setEditTodoModalOpen(false);
        } catch (error) {
            console.error('Todo 수정 중 오류 발생: ', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>Todo 수정하기</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setEditTodoModalOpen(false)}
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
                            <p>마감기한</p>
                            <input
                                type='text'
                                placeholder={deadline}
                                value={deadlineInput}
                                onChange={(e) =>
                                    setDeadlineInput(e.target.value)
                                }
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>중요도</p>
                            <input
                                type='text'
                                placeholder={priority}
                                value={priorityInput}
                                onChange={(e) =>
                                    setPriorityInput(e.target.value)
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
                        <button type='submit'>Todo 수정하기</button>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default EditTodo;

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
