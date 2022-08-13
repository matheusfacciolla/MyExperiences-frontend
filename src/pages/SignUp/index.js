import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import Loading from '../../components/Loading';


function SignUp() {
    const [signUp, setSignUp] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const inputSignUp = handleInputSignUp();
    const navigate = useNavigate();

    const obj = {
        email: signUp.email,
        name: signUp.name,
        password: signUp.password
    }

    const URL = 'http://localhost:5000/signup';

    function handleSignUp(e) {
        e.preventDefault();
        setIsLoading(true);
        const promise = axios.post(URL, obj);

        promise.then((response) => {
            setSignUp(response.data);
            setIsLoading(false);
            navigate('/');
        });

        promise.catch(error => {
            alert("Deu algum erro...");
            setIsLoading(false);
        });
    }

    function handleInputSignUp() {
        return (
            <form onSubmit={handleSignUp}>
                <input
                    type='email'
                    placeholder='email'
                    name='email'
                    value={signUp.email}
                    onChange={e => setSignUp({ ...signUp, email: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <input
                    type='text'
                    placeholder='name'
                    name='name'
                    value={signUp.name}
                    onChange={e => setSignUp({ ...signUp, name: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={signUp.password}
                    onChange={e => setSignUp({ ...signUp, password: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <div>
                    {isLoading ? <button disabled style={{ opacity: 0.7 }}><Loading /></button> : <button type='submit'>Register</button>}
                </div>
            </form>
        );
    }

    return (
        <ContainerContent>
            <ContainerLogo>
                <Link to='/'>
                    <button>My Experiences</button>
                </Link>
            </ContainerLogo>
            <ContainerInputs>
                {inputSignUp}
            </ContainerInputs>
            <Link to='/'>
                <p>Already have an account? Log in!</p>
            </Link>
        </ContainerContent>
    );
}

export default SignUp;

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
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
    button {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        text-align: center;
        color: white;
        margin-bottom: 18px;
        background: #8b82c3;
        border: none;
        cursor: pointer;
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