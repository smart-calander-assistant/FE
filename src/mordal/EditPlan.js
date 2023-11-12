import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import { getAccessToken } from '../localstorage/auth';
import SearchPlace from '../component/SearchPlace';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const EditPlan = ({
    id,
    start_time,
    end_time,
    place,
    title,
    setEditPlanModalOpen,
}) => {
    const [titleInput, setTitleInput] = useState(title);
    const [startTimeInput, setStartTimeInput] = useState(new Date(start_time));
    const [endTimeInput, setEndTimeInput] = useState(new Date(end_time));
    const [placeInput, setPlaceInput] = useState(place);
    const [coordinates, setCoordinates] = useState({
        latitude: 37.5050881,
        longitude: 126.9571012,
    });
    const accessToken = getAccessToken();

    useEffect(() => {
        // 컴포넌트가 마운트될 때, 기존 정보를 입력 필드에 표시
        setTitleInput(title);

        // start_time과 end_time을 Date 객체로 변환하여 입력
        setStartTimeInput(new Date(start_time));
        setEndTimeInput(new Date(end_time));

        setPlaceInput(place);
    }, [title, start_time, end_time, place]);

    const handlePlaceSelect = ({ place, coordinates }) => {
        setPlaceInput(place);
        setCoordinates(coordinates);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                titleInput === '' ||
                startTimeInput === '' ||
                endTimeInput === ''
            ) {
                Swal.fire({
                    icon: 'error',
                    text: '제목과 시간정보는 반드시 입력해야 합니다',
                });
                throw new Error(
                    'titleInput, startTimeInput 또는 endTimeInput이 null입니다.'
                );
            }

            const startDate = new Date(startTimeInput);
            const endDate = new Date(endTimeInput);
            
            if (startDate >= endDate) {
                Swal.fire({
                    icon: 'error',
                    text: '시작 시간은 종료 시간보다 빨라야 합니다',
                });
                return;
            }
            
            // startTimeInput과 endTimeInput을 문자열로 다시 변환
            const formattedStartTime = format(startTimeInput, 'yyyy-MM-dd HH:mm');
            const formattedEndTime = format(endTimeInput, 'yyyy-MM-dd HH:mm');

            const editPlan = {
                content: titleInput,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                place: placeInput,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            };

            console.log('editPlan:', editPlan);

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

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Plan이 수정되었습니다',
                showConfirmButton: false,
                timer: 2000,
            });
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
                            <p>시작날짜</p>
                            <DateContainer
                                selected={startTimeInput}
                                onChange={(date) => setStartTimeInput(date)}
                                locale={ko}
                                showTimeSelect
                                timeFormat='p'
                                timeIntervals={30}
                                dateFormat='yyyy-MM-dd HH:mm'
                                placeholderText={start_time}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>종료날짜</p>
                            <DateContainer
                                selected={endTimeInput}
                                onChange={(date) => setEndTimeInput(date)}
                                locale={ko}
                                showTimeSelect
                                timeFormat='p'
                                timeIntervals={30}
                                dateFormat='yyyy-MM-dd HH:mm'
                                placeholderText={end_time}
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
                            Plan 수정하기
                        </SubmitButton>
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
    text-align: center;
`;
