import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import Loading from '../../components/Loading.js';


function SignIn() {
    const { setUserInformation } = useContext(UserContext);
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
        const promise = axios.post(URL, obj);

        promise.then((response) => {
            const user = JSON.stringify(response.data)
            localStorage.setItem('token', user);
            setUserInformation(response.data);
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
            isLoading === true ?
                <form onSubmit={handleSigIn}>
                    <input
                        type='email'
                        placeholder='email'
                        disabled={true}
                        style={{ background: '#F2F2F2', color: '#AFAFAF' }}
                    />
                    <input
                        type='password'
                        placeholder='senha'
                        disabled={true}
                        style={{ background: '#F2F2F2', color: '#AFAFAF' }}

                    />
                    <button disabled style={{ opacity: 0.7 }}><Loading /></button>
                </form>
                :
                <form onSubmit={handleSigIn}>
                    <input
                        type='email'
                        placeholder='email'
                        name='email'
                        value={signIn.email}
                        onChange={e => setSignIn({ ...signIn, email: e.target.value })}
                        disabled={false}
                        required
                    />
                    <input
                        type='password'
                        placeholder='senha'
                        name='password'
                        value={signIn.senha}
                        onChange={e => setSignIn({ ...signIn, password: e.target.value })}
                        disabled={false}
                        required
                    />
                    <button type='submit'>Entrar</button>
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
                <p>Não tem uma conta? Cadastre-se!</p>
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
    background-color: white;
`;
const ContainerLogo = styled.div`
    img {
        width: 180px;
        height: 178.38px;
        margin-top: 68px;
    }
    h1 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        text-align: center;
        color: #126BA5;
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
        background: #52B6FF;
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
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;
