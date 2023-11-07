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
    const [isComplete, setIsComplete] = useState(false);
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
                    const response = await axios.get(`${requests.fetchTodo}?complete=${isComplete}`, {
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

    const handleEditPlan = (planId) => {
        axios.get(`/plan/${planId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const planData = response.data;
                console.log('수정할 Plan 데이터:', planData);
            })
            .catch((error) => {
                console.error('Plan 수정 중 오류 발생: ', error);
            });
    };

    const handleDeletePlan = (planId) => {
        axios.delete(`/plan/${planId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .catch((error) => {
            console.error('Plan 삭제 중 오류 발생: ', error);
        });
    };

    const handleEditTodo = (todoId) => {
        axios.get(`/todo/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                const todoData = response.data;
                console.log('수정할 Todo 데이터:', todoData);
            })
            .catch((error) => {
                console.error('Todo 수정 중 오류 발생: ', error);
            });
    };

    const handleDeleteTodo = (todoId) => {
        axios.delete(`/todo/${todoId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .catch((error) => {
            console.error('Todo 삭제 중 오류 발생: ', error);
        });
    };

    const handleCompleteTodo = (todoId, isCompleted) => {
        axios.patch(`/todo/${todoId}`, isCompleted, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .catch((error) => {
            console.error('Todo 패치 중 오류 발생: ', error);
        });
    };

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
                              id={item.id}
                              title={item.content}
                              deadline={item.deadline}
                              priority={item.priority}
                              place={item.place}
                              isCompleted={item.complete}
                              onEdit={handleEditTodo}
                              onDelete={handleDeleteTodo}
                              onComplete={handleCompleteTodo}
                          />
                      ))
                    : data.map((item) => (
                          <PlanCard
                              id={item.id}
                              title={item.content}
                              start_time={item.startTime}
                              end_time={item.endTime}
                              place={item.place}
                              onEdit={handleEditPlan}
                              onDelete={handleDeletePlan}
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
