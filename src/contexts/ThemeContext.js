import { useState, useEffect } from 'react';
import { createContext } from 'react';

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/themes";

import GlobalStyle from '../assets/globalStyle';

export const ThemeContext = createContext({});

function Theme({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        localTheme && setTheme(localTheme);
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <GlobalStyle />
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}

export default Theme;