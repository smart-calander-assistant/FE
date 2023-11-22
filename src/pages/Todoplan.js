import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import TodoCard from '../component/TodoCard';
import PlanCard from '../component/PlanCard';
import requests from '../api/requests';
import axios from '../api/axios';
import { getAccessToken } from '../localstorage/auth';
import ScheduleRecommend from './../mordal/ScheduleRecommend';
import { AiOutlinePlus } from 'react-icons/ai';
import AddTodo from '../mordal/AddTodo';
import AddPlan from '../mordal/AddPlan';
import Result from '../mordal/Result';

export default function Todoplan() {
    const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);
    const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);
    const [recommendModalOpen, setRecommendModalOpen] = useState(false);
    const [resultModalOpen, setResultModalOpen] = useState(false);
    
    const [remainTodo, setRemainTodo] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const [remainPlan, setRemainPlan] = useState([]);
    const [showTodoList, setShowTodoList] = useState(true);
    const [changed, setChanged] = useState(false);

    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                setChanged(false);
                if (showTodoList) {
                    // showTodoList가 true일 때는 Todo 데이터를 가져옵니다.
                    const remainTodo = await axios.get(
                        `${requests.fetchTodo}?complete=${false}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                            },
                        }
                    );
                    setRemainTodo(remainTodo.data);
                    console.log('remainTodo 데이터:', remainTodo.data);

                    const completedTodo = await axios.get(
                        `${requests.fetchTodo}?complete=${true}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                            },
                        }
                    );
                    setCompletedTodo(completedTodo.data);
                    console.log('completedTodo 데이터:', completedTodo.data);
                } else {
                    // showTodoList가 false일 때는 Plan 데이터를 가져옵니다.
                    const remainPlan = await axios.get(
                        `${requests.fetchPlan}?complete=${false}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                            },
                        }
                    );
                    setRemainPlan(remainPlan.data);
                    console.log('remainPlan 데이터:', remainPlan.data);
                }
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData();
    }, [accessToken, showTodoList, changed]);

    const handleAddTodoModal = () => {
        setAddTodoModalOpen(true);
    };

    const handleAddPlanModal = () => {
        setAddPlanModalOpen(true);
    };

    const handleEditPlan = (planId) => {
        axios
            .get(`/plan/${planId}`, {
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
        axios
            .delete(`/plan/${planId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch((error) => {
                console.error('Plan 삭제 중 오류 발생: ', error);
            });
    };

    const handleEditTodo = (todoId) => {
        axios
            .get(`/todo/${todoId}`, {
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
        axios
            .delete(`/todo/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch((error) => {
                console.error('Todo 삭제 중 오류 발생: ', error);
            });
    };

    const handleCompleteTodo = (todoId, isCompleted) => {
        axios
            .patch(`/todo/${todoId}`, isCompleted, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch((error) => {
                console.error('Todo 패치 중 오류 발생: ', error);
            });
    };

    const handleClick = () => {
        setRecommendModalOpen(true);
    };

    const handleChange = () => {
        setChanged(true);
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
            <SubmitButton onClick={handleClick}>AI일정 추천</SubmitButton>
            {recommendModalOpen && (
                <ScheduleRecommend
                    setRecommendModalOpen={setRecommendModalOpen}
                    setResultModalOpen={setResultModalOpen}
                />
            )}
            {resultModalOpen && (<Result setResultModalOpen={setResultModalOpen}/>)}
            <ContentWrapper active={showTodoList}>
                {showTodoList
                    ? remainTodo
                          .concat(completedTodo)
                          .map((item) => (
                              <TodoCard
                                  key={item.id}
                                  id={item.id}
                                  title={item.content}
                                  deadline={item.deadline}
                                  priority={item.priority}
                                  place={item.place}
                                  isCompleted={item.complete}
                                  onEdit={handleEditTodo}
                                  onDelete={handleDeleteTodo}
                                  onComplete={handleCompleteTodo}
                                  onChange={handleChange}
                              />
                          ))
                    : remainPlan.map((item) => (
                          <PlanCard
                              key={item.id}
                              id={item.id}
                              title={item.content}
                              start_time={item.startTime}
                              end_time={item.endTime}
                              place={item.place}
                              onEdit={handleEditPlan}
                              onDelete={handleDeletePlan}
                              onChange={handleChange}
                          />
                      ))}
                {!resultModalOpen && !recommendModalOpen &&
                    <PlusIcon>
                        {showTodoList && (
                            <AiOutlinePlus
                                size={'2rem'}
                                onClick={handleAddTodoModal}
                            />
                        )}
                        {!showTodoList && (
                            <AiOutlinePlus
                                size={'2rem'}
                                onClick={handleAddPlanModal}
                            />
                        )}
                        {addTodoModalOpen && (
                            <AddTodo
                                setAddTodoModalOpen={setAddTodoModalOpen}
                                onChange={handleChange}
                            />
                        )}
                        {addPlanModalOpen && (
                            <AddPlan
                                setAddPlanModalOpen={setAddPlanModalOpen}
                                onChange={handleChange}
                            />
                        )}
                    </PlusIcon>
                }
            </ContentWrapper>
            <Footer label={'todoplan'} />
        </RootContainer>
    );
}

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;

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

const SubmitButton = styled.button`
    background-color: #ffbe0b;
    color: black;
    font-size: large;
    border: 0.1rem solid #ffbe0b;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin: 0 1rem;

    &:hover {
        opacity: 0.7;
    }
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

const PlusIcon = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    right: 5vw;
    bottom: 10vh;
    padding: 0.5rem;
    background-color: #73b3f0;
    border-radius: 3rem;
    justify-content: center;
    box-shadow: 0 0 2rem 0.4rem grey;
`;
