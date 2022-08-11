import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from "../contexts/UserContext";

import styled from 'styled-components';
import { MdExitToApp } from "react-icons/md";

function Header() {
    const { setUserInformation } = useContext(UserContext);
    const [exit, setExit] = useState(true);

    const navigate = useNavigate();

    function logOut() {
        if (window.confirm("Você deseja se deslogar?")) {
            window.localStorage.removeItem('user');
            window.localStorage.clear('user');
            setUserInformation(null);
            navigate("/");
        }
    }

    return (
        <Head>
            <Link to='/experiences'>
                <button>MyExperiences</button>
            </Link>
            {exit ? <MdExitToApp onClick={() => { setExit(false) }} /> : <MdExitToApp onClick={() => { logOut(); setExit(true) }} />}
        </Head>
    );
}

export default Header;

const Head = styled.div`
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    button {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        color: white;
        background: #126BA5;
        border: none;
        cursor: pointer;
    }

    svg {
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        color: white;
        margin-right: 20px;
        cursor: pointer;
    }
`;