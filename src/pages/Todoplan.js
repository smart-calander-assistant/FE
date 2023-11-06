import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import TodoCard from '../component/TodoCard';
import PlanCard from '../component/PlanCard';
import requests from '../api/requests';
import axios from '../api/axios';
import { getAccessToken } from '../localstorage/auth';

export default function Todoplan() {
    const [data, setData] = useState([]);
    const [showTodoList, setShowTodoList] = useState(true);

    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                if (showTodoList) {
                    // showTodoList가 true일 때는 Todo 데이터를 가져옵니다.
                    const response = await axios.get(requests.fetchTodo, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                        },
                    });
                    setData(response.data);
                    console.log('Todo 데이터:', response.data);
                } else {
                    // showTodoList가 false일 때는 Plan 데이터를 가져옵니다.
                    const response = await axios.get(requests.fetchPlan, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                        },
                    });
                    setData(response.data);
                    console.log('Plan 데이터:', response.data);
                }
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData();
    }, [accessToken, showTodoList]);

    return (
        <RootContainer>
            <Header label={'해야할 일'} TodoList={showTodoList} />
            <TodoPlanContainer>
                <TypeBox
                    onClick={() => setShowTodoList(true)}
                    active={showTodoList}
                >
                    Todo List
                </TypeBox>
                <TypeBox
                    id={'addPlan'}
                    onClick={() => setShowTodoList(false)}
                    active={!showTodoList}
                >
                    Planned List
                </TypeBox>
            </TodoPlanContainer>
            <ContentWrapper active={showTodoList}>
                {showTodoList
                    ? data.map((item) => (
                          <TodoCard
                              key={item.id}
                              title={item.content}
                              deadline={item.deadline}
                              priority={item.priority}
                              place={item.place}
                          />
                      ))
                    : data.map((item) => (
                          <PlanCard
                              key={item.id}
                              title={item.content}
                              start_time={item.startTime}
                              end_time={item.endTime}
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
