import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import Loading from '../../components/Loading.js';


function SignIn() {
    const { DEFAULTURL, setUserToken, setUserName } = useContext(UserContext);
    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const inputSignIn = handleInputSignIn();
    const navigate = useNavigate();

    const obj = {
        email: signIn.email,
        password: signIn.password
    }

    const URL = `${DEFAULTURL}/`;

    function handleSigIn(e) {
        e.preventDefault();
        setIsLoading(true);
        const promise = axios.post(URL, obj);

        promise.then((response) => {
            const user = JSON.stringify(response.data.token);
            const name = JSON.stringify(response.data.name);
            localStorage.setItem('token', user);
            localStorage.setItem('name', name);
            setUserToken(response.data.token);
            setUserName(response.data.name);
            setIsLoading(false);
            navigate('/experiences');
        });

        promise.catch(error => {
            alert('Usuário ou senha incorretos...');
            setIsLoading(false);
        });
    }

    function handleInputSignIn() {
        return (
            <form onSubmit={handleSigIn}>
                <input
                    type='email'
                    placeholder='email'
                    name='email'
                    value={signIn.email}
                    onChange={e => setSignIn({ ...signIn, email: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={signIn.senha}
                    onChange={e => setSignIn({ ...signIn, password: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                {isLoading ? <button disabled style={{ opacity: 0.7 }}><Loading /></button> : <button type='submit'>Enter</button>}
            </form>
        );
    }

    return (
        <ContainerContent>
            <ContainerLogo>
                <h1>My Experiences</h1>
            </ContainerLogo>
            <ContainerInputs>
                {inputSignIn}
            </ContainerInputs>
            <Link to='/signup'>
                <p>Don't have an account? Register!</p>
            </Link>
        </ContainerContent>
    );
}

export default SignIn;

const ContainerContent = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.global};

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: ${({ theme }) => theme.text};
        cursor: pointer;
    }
`;
const ContainerLogo = styled.div`
    width: 100%;
    h1 {
        width: 100%;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        text-align: center;
        color: ${({ theme }) => theme.text};
        margin-bottom: 18px;

        @media(max-width: 500px) {
            font-size: 40px;
            line-height: 40px;
        }
    }
`;

const ContainerInputs = styled.div`
    width: 100%;
    input {
        width: 100%;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        padding-left: 14px;
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    input::placeholder {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
    }
    button {
        width: 100%;
        height: 45px;
        background-color: ${({ theme }) => theme.body};
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        border: none;
        color: ${({ theme }) => theme.text};
        margin-bottom: 25px;
        cursor: pointer;
    }
`;
