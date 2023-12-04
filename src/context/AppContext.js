import React, { createContext, useReducer, useContext } from 'react';

// 초기 상태
const initialState = {
  plans: [],
};

// 액션 타입
const SET_PLANS = 'SET_PLANS';

// 리듀서 함수
const appReducer = (state, action) => {
  switch (action.type) {
    case SET_PLANS:
      return { ...state, plans: action.payload };
    default:
      return state;
  }
};

// 컨텍스트 생성
const AppContext = createContext();

// 컨텍스트 프로바이더 컴포넌트
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// 컨텍스트 사용을 위한 커스텀 훅
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext는 AppProvider 내에서 사용되어야 합니다');
  }
  return context;
};
