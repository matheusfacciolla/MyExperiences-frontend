import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import Loading from '../../components/Loading.js';


function SignIn() {
    const { setUserToken, setUserName } = useContext(UserContext);
    const [signIn, setSignIn] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const inputSignIn = handleInputSignIn();
    const navigate = useNavigate();

    const obj = {
        email: signIn.email,
        password: signIn.password
    }

    const URL = 'http://localhost:5000/';

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
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #8b82c3;

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: white;
        cursor: pointer;
    }
`;
const ContainerLogo = styled.div`
    img {
        width: 180px;
        height: 178.38px;
        margin-top: 68px;
    }
    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        text-align: center;
        color: white;
        margin-bottom: 18px;
    }
`;

const ContainerInputs = styled.div`
    input {
        width: 303px;
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
        width: 303px;
        height: 45px;
        background: #5745c6;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        border: none;
        color: #FFFFFF;
        margin-bottom: 25px;
        cursor: pointer;
    }
`;
