import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import { getAccessToken } from '../localstorage/auth';
import NumberSelector from '../component/NumberSelector';
import SearchPlace from '../component/SearchPlace';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const EditTodo = ({
    id,
    deadline,
    priority,
    place,
    title,
    setEditTodoModalOpen,
}) => {
    const [titleInput, setTitleInput] = useState(title);
    const [deadlineInput, setDeadlineInput] = useState(new Date(deadline));
    const [priorityInput, setPriorityInput] = useState(priority);
    const [placeInput, setPlaceInput] = useState(place);
    const [coordinates, setCoordinates] = useState({
        latitude: 37.5050881,
        longitude: 126.9571012,
    });
    const accessToken = getAccessToken();

    useEffect(() => {
        // 컴포넌트가 마운트될 때, 기존 정보를 입력 필드에 표시
        setTitleInput(title);
        setDeadlineInput(new Date(deadline));
        setPriorityInput(priority);
        setPlaceInput(place);
    }, [title, deadline, priority, place]);

    const handlePlaceSelect = ({ place, coordinates }) => {
        setPlaceInput(place);
        setCoordinates(coordinates);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (titleInput === '' || deadlineInput === '') {
                Swal.fire({
                    icon: 'error',
                    text: '제목과 마감기한은 반드시 입력해야 합니다',
                });
                throw new Error('titleInput 또는 deadlineInput이 null입니다.');
            }

            const formattedDeadline = format(deadlineInput, 'yyyy-MM-dd HH:mm');

            const editTodo = {
                content: titleInput,
                deadline: formattedDeadline,
                priority: priorityInput,
                place: placeInput,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            };

            console.log('editTodo:', editTodo);

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
            setCoordinates({ latitude: 37.5050881, longitude: 126.9571012 });

            // 모달 닫기
            setEditTodoModalOpen(false);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Todo가 수정되었습니다',
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            console.error('Todo 수정 중 오류 발생: ', error);
        }
    };

    const handleNumberSelect = (priority) => {
        setPriorityInput(priority);
        console.log(`Selected number: ${priority}`);
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
                    <InputList>
                        <InputLabel>
                            <p>제목</p>
                            <InputBox
                                type='text'
                                value={titleInput}
                                placeholder={title}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>마감기한</p>
                            <DateContainer
                                selected={deadlineInput}
                                onChange={(date) => setDeadlineInput(date)}
                                locale={ko}
                                showTimeSelect
                                timeFormat='p'
                                timeIntervals={30}
                                dateFormat='yyyy-MM-dd HH:mm'
                                placeholderText={deadline}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>중요도</p>
                            <NumberSelector
                                onSelect={handleNumberSelect}
                                number={5}
                                defaultNumber={priorityInput}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>장소</p>
                            <SearchPlace
                                onPlaceSelect={handlePlaceSelect}
                                placeholder={place}
                            />
                        </InputLabel>
                        <SubmitButton onClick={handleSubmit}>
                            Todo 수정하기
                        </SubmitButton>
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
    justify-content: center;
    padding: 6rem 1.5rem;
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

const DateContainer = styled(DatePicker)`
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;
