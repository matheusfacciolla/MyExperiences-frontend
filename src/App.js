import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from './contexts/UserContext.js';
import GlobalStyle from './assets/globalStyle.js';

import SignIn from './pages/SignIn/index.js';
import SignUp from './pages/SignUp/index.js';
import Experiences from './pages/Experiences/index.js';
import PlannedExperiences from './pages/PlannedExperiences/index.js';

function App() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    const [userInformation, setUserInformation] = useState(tokenStorage);
    const [att, setAtt] = useState(false);

    useEffect(() => {
        if (tokenStorage) {
            setUserInformation(tokenStorage);
        }
    }, []);
    
    const contextValue = { userInformation, setUserInformation, att, setAtt };

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
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;