import './App.css';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Todoplan from './pages/Todoplan';
import Setting from './pages/Setting';
import Schedule from './pages/Schedule';
import { getAccessToken } from './localstorage/auth';

function App() {
    const accessToken = getAccessToken();

    return (
        <RootContainer>
            <OutterContainer>
                <InnerContainer>
                    {!accessToken ? (
                        <Routes>
                            <Route path='/' element={<Login />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='/calendar' element={<Calendar />} />
                            <Route path='/todoplan' element={<Todoplan />} />
                            <Route path='/schedule' element={<Schedule />} />
                            <Route path='/setting' element={<Setting />} />
                        </Routes>
                    )}
                </InnerContainer>
            </OutterContainer>
        </RootContainer>
    );
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
