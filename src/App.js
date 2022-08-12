import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from './contexts/UserContext.js';
import GlobalStyle from './assets/globalStyle.js';

import SignIn from './pages/SignIn/index.js';
import SignUp from './pages/SignUp/index.js';
import Experiences from './pages/Experiences/index.js';
import PlannedExperiences from './pages/PlannedExperiences/index.js';
import NewRegister from './pages/NewRegister/index.js';

function App() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    const nameStorage = JSON.parse(localStorage.getItem('name'));
    const [userToken, setUserToken] = useState(tokenStorage);
    const [userName, setUserName] = useState(nameStorage);
    const [att, setAtt] = useState(false);

    useEffect(() => {
        if (tokenStorage) {
            setUserToken(tokenStorage);
        }
        if (nameStorage) {
            setUserName(nameStorage);
        }
    // eslint-disable-next-line
    }, []);

    const contextValue = { userToken, setUserToken, userName, setUserName, att, setAtt };

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/experiences' element={<Experiences />} />
                        <Route path='/experiences/planned' element={<PlannedExperiences />} />
                        <Route path='/create' element={<NewRegister />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;