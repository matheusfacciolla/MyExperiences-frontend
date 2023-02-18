import { useState, useEffect, createContext } from 'react';

export const UserContext = createContext({});

function UserProvider({ children }) {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    const nameStorage = JSON.parse(localStorage.getItem('name'));
    const [userToken, setUserToken] = useState(tokenStorage);
    const [userName, setUserName] = useState(nameStorage);
    const [att, setAtt] = useState(false);

    const DEFAULTURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        if (tokenStorage) {
            setUserToken(tokenStorage);
        }
        if (nameStorage) {
            setUserName(nameStorage);
        }
        // eslint-disable-next-line
    }, []);


    return (
        <UserContext.Provider value={{ DEFAULTURL, userToken, setUserToken, userName, setUserName, att, setAtt }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;