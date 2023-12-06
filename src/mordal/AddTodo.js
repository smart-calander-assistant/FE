import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import requests from '../api/requests';
import { getAccessToken } from '../localstorage/auth';
import NumberSelector from '../component/NumberSelector';
import SearchPlace from '../component/SearchPlace';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import SelectCategory from '../component/SelectCategory';

const AddTodo = ({ setAddTodoModalOpen, onChange, categoryList }) => {
    const [titleInput, setTitleInput] = useState('');
    const [priorityInput, setPriorityInput] = useState(3);
    const [deadlineInput, setDeadlineInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });

    const accessToken = getAccessToken();

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

            if (categoryInput === '') {
                Swal.fire({
                    icon: 'error',
                    text: '카테고리를 입력 혹은 추가해주세요',
                });
                throw new Error(
                    'category값이 null입니다.'
                );
            }

            const formattedDeadline = format(deadlineInput, 'yyyy-MM-dd HH:mm');

            const newTodo = {
                content: titleInput,
                deadline: formattedDeadline,
                priority: priorityInput,
                place: placeInput,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                category: categoryInput,
            };

            console.log('newTodo:', newTodo);

            // Axios를 사용하여 POST 요청을 보냅니다.
            await axios.post(requests.fetchTodo, newTodo, {
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
            setAddTodoModalOpen(false);
            // window.location.reload();

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Todo가 추가되었습니다',
                showConfirmButton: false,
                timer: 2000,
            });
            onChange();
        } catch (error) {
            console.error('Todo 추가 중 오류 발생: ', error);
        }
    };

    const handleNumberSelect = (priority) => {
        setPriorityInput(priority);
        console.log(`Selected number: ${priority}`);
    };

    const handleCategory = (category) => {
        setCategoryInput(category);
    }

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
                    <InputList>
                        <InputLabel>
                            <p>제목</p>
                            <InputBox
                                type='text'
                                value={titleInput}
                                placeholder={'제목을 입력하세요'}
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
                                timeIntervals={60}
                                dateFormat='yyyy-MM-dd HH:mm'
                                placeholderText='마감기한을 선택하세요'
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
                            <p>카테고리</p>
                            <SelectCategory onChange={handleCategory} categoryList={categoryList}/>
                        </InputLabel>
                        <InputLabel>
                            <p>장소</p>
                            <SearchPlace
                                onPlaceSelect={handlePlaceSelect}
                                placeholder={'장소를 입력하세요'}
                            />
                        </InputLabel>
                        <SubmitButton onClick={handleSubmit}>
                            Todo 추가하기
                        </SubmitButton>
                    </InputList>
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
    text-align: center;
`;
