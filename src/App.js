import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserProvider from './contexts/UserContext.js';
import Theme from './contexts/ThemeContext.js';

import SignIn from './pages/SignIn/index.js';
import SignUp from './pages/SignUp/index.js';
import Experiences from './pages/Experiences/index.js';
import PlannedExperiences from './pages/PlannedExperiences/index.js';
import NewRegister from './pages/NewRegister/index.js';

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route path='/' element={<SignIn />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/experiences' element={<Experiences />} />
                        <Route path='/experiences/planned' element={<PlannedExperiences />} />
                        <Route path='/create' element={<NewRegister />} />
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </Theme>
    );
}

export default App;