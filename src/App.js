import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from './contexts/UserContext.js';
import GlobalStyle from './assets/globalStyle.js';

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/themes";

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
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (tokenStorage) {
            setUserToken(tokenStorage);
        }
        if (nameStorage) {
            setUserName(nameStorage);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        localTheme && setTheme(localTheme);
    }, []);

    const contextValue = { userToken, setUserToken, userName, setUserName, att, setAtt, theme, setTheme };

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
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
        </ThemeProvider>
    );
}

export default App;