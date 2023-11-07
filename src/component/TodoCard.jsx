import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
    IoAlarmOutline,
    IoListCircleOutline,
    IoFlagSharp,
    IoEllipsisHorizontalSharp,
} from 'react-icons/io5';
import useOnClickOutside from '../hooks/useOnClickOutside';
import EditTodo from '../mordal/EditTodo';
import BorderLine from './BorderLine';

const TodoCard = ({
    id,
    deadline,
    priority,
    place,
    title,
    isCompleted,
    onEdit,
    onDelete,
    onComplete,
}) => {
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editTodoModalOpen, setEditTodoModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(true);
    };

    useOnClickOutside(ref, () => {
        setIsMenuOpen(false);
    });

    const handleEditClick = () => {
        // "수정하기" 클릭 시 수행할 작업
        setIsMenuOpen(false);
        setEditTodoModalOpen(true);
        console.log('수정하기');
        onEdit(id);
    };

    const handleDeleteClick = () => {
        // "삭제하기" 클릭 시 수행할 작업
        setIsMenuOpen(false);
        console.log('삭제하기');
        onDelete(id);
    };

    const handleCompleteClick = () => {
        isCompleted = false;
        setIsMenuOpen(false);
        console.log('작업완료');
        onComplete(id, isCompleted);
    };

    return (
        <TodoContainer>
            <HeaderBox>
                <PriorityBox>
                    <IoFlagSharp size={'1rem'} />
                    {!isCompleted && <p>Todo 미완료</p>}
                    {isCompleted && <p>Todo 완료</p>}
                </PriorityBox>
                <IoEllipsisHorizontalSharp
                    size={'1.5rem'}
                    onClick={toggleMenu}
                />
                {isMenuOpen && (
                    <Menu ref={ref}>
                        <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            삭제하기
                        </MenuItem>
                        <MenuItem onClick={handleCompleteClick}>
                            작업완료
                        </MenuItem>
                    </Menu>
                )}
            </HeaderBox>
            <ContentBox>
                <TitleBox>
                    <IoListCircleOutline size={'1.5rem'} color={'#DE496E'} />
                    <p>{title}</p>
                </TitleBox>
                <PlaceBox>
                    {place === '' ? '' : <p>장소 : {place}</p>}
                </PlaceBox>
                <BorderLine />
                <TimeContainer>
                    <AlarmBox>
                        <IoAlarmOutline size={'1rem'} />
                        <p>08:30 PM</p>
                    </AlarmBox>
                    <TimeBox>
                        <p>마감기한 : {deadline}</p>
                    </TimeBox>
                </TimeContainer>
            </ContentBox>
            {editTodoModalOpen && (
                <EditTodo
                    id={id}
                    title={title}
                    deadline={deadline}
                    place={place}
                    setEditTodoModalOpen={setEditTodoModalOpen}
                />
            )}
        </TodoContainer>
    );
};

export default TodoCard;

const TodoContainer = styled.div`
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
`;
const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 0.5rem;
    background-color: #de496e;
    border-radius: 0.5rem 0.5rem 0 0;
    height: 2.5rem;

    color: white;
`;
const PriorityBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    gap: 0.5rem;

    font-size: smaller;
`;

const Menu = styled.div`
    position: absolute;
    color: black;
    background: white;
    border: 0.5px solid #3a86ff;
    right: 1rem;
`;

const MenuItem = styled.div`
    padding: 0.5rem 1rem;
    border: 0.5px solid #3a86ff;
    &:hover {
        background-color: #3a86ff;
        opacity: 0.7;
    }
`;

const ContentBox = styled.div`
    background-color: white;
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0.5rem;
`;
const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem;
    gap: 0.5rem;

    font-size: large;
`;

const PlaceBox = styled.div`
    display: flex;
    justify-content: end;
    margin: 0 0.5rem 0 0;
    font-size: small;
`;

const TimeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0.5rem;

    font-size: smaller;
`;

const AlarmBox = styled.div`
    display: flex;
    color: #ff486a;
    align-items: center;
    gap: 0.5rem;
`;

const TimeBox = styled.div`
    display: flex;
`;
