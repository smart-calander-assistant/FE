import React, { createContext, useReducer, useContext } from 'react';

// 초기 상태
const initialState = {
    showTodoList: true,
    showPlannedList: false,
    todoItems: [
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
    ],
    plannedItems: [
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
    ],
};

// 액션 타입 정의
const SHOW_TODO_LIST = 'SHOW_TODO_LIST';
const SHOW_PLANNED_LIST = 'SHOW_PLANNED_LIST';
const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
const ADD_PLANNED_ITEM = 'ADD_PLANNED_ITEM';

// 리듀서 함수
const todoReducer = (state, action) => {
    switch (action.type) {
        case SHOW_TODO_LIST:
            return { ...state, showTodoList: true, showPlannedList: false };
        case SHOW_PLANNED_LIST:
            return { ...state, showTodoList: false, showPlannedList: true };
        case ADD_TODO_ITEM:
            return {
                ...state,
                todoItems: [...state.todoItems, action.payload],
            };
        case ADD_PLANNED_ITEM:
            return {
                ...state,
                plannedItems: [...state.plannedItems, action.payload],
            };
        default:
            return state;
    }
};

// Context 생성
const TodoContext = createContext();

// Context Provider 컴포넌트
const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

// 커스텀 훅
const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};

export {
    TodoProvider,
    TodoContext,
    useTodoContext,
    SHOW_TODO_LIST,
    SHOW_PLANNED_LIST,
    ADD_TODO_ITEM,
    ADD_PLANNED_ITEM,
};
