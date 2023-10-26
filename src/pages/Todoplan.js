import React, { useState } from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import TodoCard from '../component/TodoCard';
import PlanCard from '../component/PlanCard';

export default function Todoplan() {
    const [showTodoList, setShowTodoList] = useState(true);
    const [showPlannedList, setShowPlannedList] = useState(false);

    const handleShowTodoList = () => {
        if (!showTodoList) {
            setShowPlannedList(false);
            setShowTodoList(true);
        }
    };

    const handleShowPlannedList = () => {
        if (!showPlannedList) {
            setShowPlannedList(true);
            setShowTodoList(false);
        }
    };

    const todoItems = [
        {
            id: 1,
            title: 'Task 1',
            deadline: '10-10:20:00',
            priority: 3,
            place: '중앙대학교',
        },
        {
            id: 2,
            title: 'Task 2',
            deadline: '10-10:20:00',
            priority: 3,
            place: '중앙대학교',
        },
        {
            id: 3,
            title: 'Task 3',
            deadline: '10-10:20:00',
            priority: 3,
            place: '중앙대학교',
        },
        {
            id: 4,
            title: 'Task 4',
            deadline: '10-10:20:00',
            priority: 3,
            place: '중앙대학교',
        },
        {
            id: 5,
            title: 'Task 5',
            deadline: '10-10:20:00',
            priority: 3,
            place: '중앙대학교',
        },
        {
            id: 6,
            title: 'Task 6',
            deadline: '10-10:20:00',
            priority: 3,
            place: '중앙대학교',
        },
    ];

    const plannedItems = [
        {
            id: 1,
            title: 'Plan 1',
            start_time: '10-10:20:00',
            end_time: '10-10:22:00',
            place: '중앙대학교',
        },
        {
            id: 2,
            title: 'Plan 2',
            start_time: '10-10:20:00',
            end_time: '10-10:22:00',
            place: '중앙대학교',
        },
        {
            id: 3,
            title: 'Plan 3',
            start_time: '10-10:20:00',
            end_time: '10-10:22:00',
            place: '중앙대학교',
        },
        {
            id: 4,
            title: 'Plan 4',
            start_time: '10-10:20:00',
            end_time: '10-10:22:00',
            place: '중앙대학교',
        },
        {
            id: 5,
            title: 'Plan 5',
            start_time: '10-10:20:00',
            end_time: '10-10:22:00',
            place: '중앙대학교',
        },
        {
            id: 6,
            title: 'Plan 6',
            start_time: '10-10:20:00',
            end_time: '10-10:22:00',
            place: '중앙대학교',
        },
    ];

    return (
        <RootContainer>
            <Header label={'해야할 일'} />
            <TodoPlanContainer>
                <TypeBox
                    onClick={() => handleShowTodoList()}
                    active={showTodoList}
                >
                    Todo List
                </TypeBox>
                <TypeBox
                    onClick={() => handleShowPlannedList()}
                    active={showPlannedList}
                >
                    Planned List
                </TypeBox>
            </TodoPlanContainer>
            <ContentWrapper active={showTodoList}>
                {showTodoList
                    ? todoItems.map((item) => (
                          <TodoCard
                              id={item.id}
                              title={item.title}
                              deadline={item.deadline}
                              priority={item.priority}
                              place={item.place}
                          />
                      ))
                    : plannedItems.map((item) => (
                          <PlanCard
                              id={item.id}
                              title={item.title}
                              start_time={item.start_time}
                              end_time={item.end_time}
                              place={item.place}
                          />
                      ))}
            </ContentWrapper>
            <Footer label={'todoplan'} />
        </RootContainer>
    );
}

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: hidden;
    scroll-behavior: smooth;

    &:hover {
        overflow-y: auto;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => (props.active ? '#de496e' : '#0acf83')};
        border-radius: 1rem;
    }
    
    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }
`;

const TodoPlanContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 1rem 0;
`;
const TypeBox = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #3a86ff;
    opacity: ${(props) => (props.active ? '0.7' : '1')};
    color: ${(props) => (props.active ? 'white' : 'black')};
    padding: 1rem;
`;
