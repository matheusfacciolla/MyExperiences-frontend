import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from './contexts/UserContext.js';
import GlobalStyle from './assets/globalStyle.js';

import SignIn from './pages/SignIn/index.js';
import SignUp from './pages/SignUp/index.js';
import Experiences from './pages/Experiences/index.js';

function App() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    const [userInformation, setUserInformation] = useState(tokenStorage);

    useEffect(() => {
        if (tokenStorage) {
            setUserInformation(tokenStorage);
        }
    }, [tokenStorage]);
    
    const contextValue = { userInformation, setUserInformation };

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/experiences' element={<Experiences />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;