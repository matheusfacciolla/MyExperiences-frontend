import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';

import styled from 'styled-components';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

function NewRegister() {
    const { userToken } = useContext(UserContext);
    const [create, setCreate] = useState({});

    const inputCreate = handleInputCreate();
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    
    const obj = {
        title: create.title,
        place: create.place,
        date: create.date,
        description: create.description,
        category_id: parseInt(create.category_id)
    }

    const URL = `http://localhost:5000/experiences${create.type === "experience" ? "" : "/planned"}/create`;

    function handleCreate(e) {
        e.preventDefault();
        const promise = axios.post(URL, obj, config);

        promise.then((response) => {
            setCreate(response.data);
            navigate(`/${create.type === "experience" ? "experiences" : "experiences/planned"}`)
        });

        promise.catch(error => {
            alert("Deu algum erro...");
        });
    }

    function handleInputCreate() {
        return (
            <form onSubmit={handleCreate}>
                <select
                    type='text'
                    placeholder='selecione'
                    name='create'
                    value={create.category}
                    onChange={e => setCreate({ ...create, type: e.target.value })}
                    disabled={false}
                    required
                >
                    <option value="">select</option>
                    <option value="experience">experience</option>
                    <option value="planned_experience">planned experience</option>
                </select>
                <input
                    type='text'
                    placeholder='title'
                    name='title'
                    value={create.title}
                    onChange={e => setCreate({ ...create, title: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='text'
                    placeholder='place'
                    name='place'
                    value={create.place}
                    onChange={e => setCreate({ ...create, place: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='date'
                    placeholder='date'
                    name='date'
                    value={create.date}
                    onChange={e => setCreate({ ...create, date: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='text'
                    placeholder='description'
                    name='description'
                    value={create.description}
                    onChange={e => setCreate({ ...create, description: e.target.value })}
                    disabled={false}
                    required
                />
                <select
                    type='text'
                    placeholder='category'
                    name='category'
                    value={create.category}
                    onChange={e => setCreate({ ...create, category_id: e.target.value })}
                    disabled={false}
                    required
                >
                    <option value="">select</option>
                    <option value="1">Sports</option>
                    <option value="2">Shows</option>
                    <option value="3">Trips</option>
                    <option value="4">Others</option>
                </select>
                <div>
                    <button type='submit'>Register</button>
                </div>
            </form>
        );
    }

    return (
        <ContainerContent>
            <Header />
            <H1>Register new/planned <br />experience</H1>
            <ContainerInputs>
                {inputCreate}
            </ContainerInputs>
            <Navigation />
        </ContainerContent>
    );
}

export default NewRegister;

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #7e72c7;
    width: 500px;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const H1 = styled.h1`
    text-align: center;
    margin-bottom: 50px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 29px;
    color: white;
`;

const ContainerInputs = styled.div`
    input {
        width: 303px;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        display: flex;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        padding-left: 14px;
        padding-right: 20px;
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    select {
        width: 303px;
        height: 50px;
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
        padding-top: 13px;
        padding-left: 14px;
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    select:first-child{
        margin-bottom: 50px;
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