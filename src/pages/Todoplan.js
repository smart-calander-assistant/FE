import React from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import TodoCard from '../component/TodoCard';
import PlanCard from '../component/PlanCard';
import { useTodoContext, SHOW_TODO_LIST, SHOW_PLANNED_LIST } from '../context/TodoContext';

export default function Todoplan() {
  const { state, dispatch } = useTodoContext();
  const { showTodoList, showPlannedList } = state;

  const todoItems = state.todoItems;
  const plannedItems = state.plannedItems;

  return (
    <RootContainer>
      <Header label={'해야할 일'} TodoList={showTodoList} PlannedItems={plannedItems} TodoItems={todoItems}/>
      <TodoPlanContainer>
        <TypeBox onClick={() => dispatch({ type: SHOW_TODO_LIST })} active={showTodoList}>
          Todo List
        </TypeBox>
        <TypeBox onClick={() => dispatch({ type: SHOW_PLANNED_LIST })} active={showPlannedList}>
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
