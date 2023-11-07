import React, {useState} from 'react';
import styled from 'styled-components';
import {IoClose} from 'react-icons/io5';
import axios from '../api/axios';
import requests from '../api/requests';
import {getAccessToken} from '../localstorage/auth';
import SearchPlace from '../component/SearchPlace';

const AddTodo = ({setAddTodoModalOpen}) => {
    const [titleInput, setTitleInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [priorityInput, setPriorityInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const accessToken = getAccessToken();
    const [coordinates, setCoordinates] = useState({latitude: 37.5050881, longitude: 126.9571012});

    const handlePlaceSelect = ({place, coordinates}) => {
        setPlaceInput(place);
        setCoordinates(coordinates);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTodo = {
            content: titleInput,
            deadline: deadlineInput,
            priority: priorityInput,
            place: placeInput,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        };

        console.log('newTodo:', newTodo);

        try {
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
            setCoordinates({latitude: 37.5050881, longitude: 126.9571012});

            // 모달 닫기
            setAddTodoModalOpen(false);
        } catch (error) {
            console.error('Todo 추가 중 오류 발생: ', error);
        }
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
                            <p>마감기한</p>
                            <input
                                type='text'
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
                                value={priorityInput}
                                onChange={(e) =>
                                    setPriorityInput(e.target.value)
                                }
                            />
                        </InputLabel>
                        <SearchPlace onPlaceSelect={handlePlaceSelect}/>
                        <button type='submit'>Todo 추가하기</button>
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

const InputList = styled.form`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`

const InputLabel = styled.label`
  display: flex;
  gap: 1rem;
  height: 4rem;
  justify-content: center;
`
