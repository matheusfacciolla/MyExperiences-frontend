import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from '../contexts/UserContext';
import GlobalStyle from '../assets/globalStyles';

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
                        {/* <Route path='/' element={<Login />} />
                        <Route path='/cadastro' element={<Register />} /> */}
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;