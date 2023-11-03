import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { TodoContext, ADD_TODO_ITEM } from '../context/TodoContext';

const AddTodo = ({ setAddTodoModalOpen }) => {
    const { state, dispatch } = useContext(TodoContext);

    const [titleInput, setTitleInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [priorityInput, setPriorityInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: state.plannedItems.length + 1,
            title: titleInput,
            deadline: deadlineInput,
            priority: priorityInput,
            place: placeInput,
        };

        // Context API를 통해 ADD_TODO_ITEM 액션을 디스패치하여 전역 상태 업데이트
        dispatch({ type: ADD_TODO_ITEM, payload: newTodo });

        // 입력값 초기화
        setTitleInput('');
        setDeadlineInput('');
        setPriorityInput('');
        setPlaceInput('');

        // 모달 닫기
        setAddTodoModalOpen(false);
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>Todo 추가하기</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setAddTodoModalOpen(false)}
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
                            마감기한:
                            <input
                                type='text'
                                value={deadlineInput}
                                onChange={(e) =>
                                    setDeadlineInput(e.target.value)
                                }
                            />
                        </label>
                        <label>
                            중요도:
                            <input
                                type='text'
                                value={priorityInput}
                                onChange={(e) =>
                                    setPriorityInput(e.target.value)
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

export default AddTodo;


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