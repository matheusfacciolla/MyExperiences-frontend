import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import styled from 'styled-components';
import { MdExitToApp } from "react-icons/md";

function Header() {
    const { setUserToken, setUserName, userName, theme, setTheme } = useContext(UserContext);
    const [exit, setExit] = useState(true);

    const navigate = useNavigate();

    function logOut() {
        if (window.confirm("Do you want to log out?")) {
            window.localStorage.removeItem('user');
            window.localStorage.clear('user');
            window.localStorage.removeItem('name');
            window.localStorage.clear('name');
            setUserToken(null);
            setUserName(null);
            navigate("/");
        }
    }

    const toggleTheme = () => {
        if (theme === "light") {
          localStorage.setItem("theme", "dark");
          setTheme("dark");
        } else {
          localStorage.setItem("theme", "light");
          setTheme("light");
        }
      };

    return (
        <Head>
            <Link to='/experiences'>
                <button>MyExperiences</button>
            </Link>
            <div>
                <p>{`Welcome, ${userName}!`}</p>
                {exit ? <MdExitToApp onClick={() => { setExit(false) }} /> : <MdExitToApp onClick={() => { logOut(); setExit(true) }} />}
            </div>
            <ContainerTheme>
                <Title>{theme} mode</Title>
                <SwitchButton onClick={() => toggleTheme()}>Trocar tema</SwitchButton>
            </ContainerTheme>
        </Head>
    );
}

export default Header;

const Head = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${({ theme }) => theme.body};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    div {
        display: flex;
        align-items: center;
    }

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        color: ${({ theme }) => theme.text};
        font-weight: 400;
        font-size: 20px;
        margin-right: 20px;

        @media(max-width: 500px) {
            display: none;
        }
    }

    button {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        border: none;
        cursor: pointer;
    }

    svg {
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        color: ${({ theme }) => theme.text};
        margin-right: 20px;
        cursor: pointer;
    }
`;

const ContainerTheme = styled.div`

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const SwitchButton = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.body};
  margin-left: 10px;
`;