import './App.css';
import styled from 'styled-components';
import { Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Todoplan from './pages/Todoplan';
import Setting from './pages/Setting';
import Schedule from './pages/Schedule';

function App() {
    const [isLogined, setIsLogined] = useState(false);

    // 로그인이 안된경우 로그인페이지
    if (!isLogined) {
        return (
            <RootContainer>
                <OutterContainer>
                    <InnerContainer>
                        <Routes>
                            <Route path='/' element={<Login />} />
                        </Routes>
                    </InnerContainer>
                </OutterContainer>
            </RootContainer>
        );
    }
    else {
        return (
            <RootContainer>
                <OutterContainer>
                    <InnerContainer>
                    <Routes>
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/todoplan" element={<Todoplan />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/setting" element={<Setting />} />
                    </Routes>
                    </InnerContainer>
                </OutterContainer>
            </RootContainer>
        );
    }
}

export default App;

const RootContainer = styled.div`
    display: flex;
    max-height: 100vh;
    flex: 1;
`;

const OutterContainer = styled.div`
    display: flex;
    max-height: 100vh;
    justify-content: center;
    background-color: #f5f5f5;
    margin: 0 auto;
    flex: 1;
`;

const InnerContainer = styled.div`
    max-width: 100wh;
    background-color: #f5f5f5;
    flex: 1;
`;
