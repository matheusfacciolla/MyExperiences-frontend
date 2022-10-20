import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";
import moment from 'moment';

import { UserContext } from '../../contexts/UserContext';

import styled from 'styled-components';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Loading from '../../components/Loading';

function NewRegister() {
    const { DEFAULTURL, userToken } = useContext(UserContext);
    const [create, setCreate] = useState({ title: "", date: "", place: "", description: "", category_id: "" });
    const [isLoading, setIsLoading] = useState(false);

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
        date: moment(create.date).format("DD/MM/YYYY"),
        description: create.description,
        category_id: parseInt(create.category_id)
    }

    const URL = `${DEFAULTURL}/experiences${create.type === "experience" ? "" : "/planned"}/create`;

    function handleCreate(e) {
        e.preventDefault();
        setIsLoading(true)
        const date1 = moment(dayjs(Date.now()));
        const date2 = moment(create.date);
        const diff = date1.diff(date2, 'day');

        if (diff < 0 && create.type === 'experience') {
            alert("The day of this experience has not arrived yet...");
            setIsLoading(false);
            return;
        }

        if (diff > 0 && create.type === 'planned_experience') {
            alert("This day has passed, impossible to plan this experience...");
            setIsLoading(false);
            return;
        }

        const promise = axios.post(URL, obj, config);

        promise.then((response) => {
            setCreate(response.data);
            setIsLoading(false);
            navigate(`/${create.type === "experience" ? "experiences" : "experiences/planned"}`)
        });

        promise.catch(error => {
            setIsLoading(false);
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
                    disabled={isLoading ? true : false}
                    required
                >
                    <option value="">select</option>
                    <option value="experience">experience</option>
                    <option value="planned_experience">planned experience</option>
                </select>
                <input
                    type='text'
                    placeholder='title (max 30 caracteres)'
                    name='title'
                    value={create.title}
                    onChange={e => setCreate({ ...create, title: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <input
                    type='text'
                    placeholder='place (max 20 caracteres)'
                    name='place'
                    value={create.place}
                    onChange={e => setCreate({ ...create, place: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <input
                    type='date'
                    placeholder='date'
                    name='date'
                    value={create.date}
                    onChange={e => setCreate({ ...create, date: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <input
                    type='text'
                    placeholder='description (max 40 caracteres)'
                    name='description'
                    value={create.description}
                    onChange={e => setCreate({ ...create, description: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                />
                <select
                    type='text'
                    placeholder='category'
                    name='category'
                    value={create.category}
                    onChange={e => setCreate({ ...create, category_id: e.target.value })}
                    disabled={isLoading ? true : false}
                    required
                >
                    <option value="">select</option>
                    <option value="1">Sports</option>
                    <option value="2">Shows</option>
                    <option value="3">Trips</option>
                    <option value="4">Others</option>
                </select>
                <div>
                    {isLoading ? <button type='submit' disabled style={{ opacity: 0.7 }}><Loading /></button> : <button type='submit'>Register</button>}
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
    background-color: ${({ theme }) => theme.global};
    justify-content: center;
    align-items: center;
    width: 500px;
    margin-top: 80px;
    margin-bottom: 77px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    @media(max-width: 500px) {
        width: 300px;
    }
`;

const H1 = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 29px;
    color: white;

    @media(max-width: 500px) {
        font-size: 24px;
        line-height: 24px;
    }
`;

const ContainerInputs = styled.div`
    input {
        width: 380px;
        height: 35px;
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

        @media(max-width: 500px) {
            width: 250px;
            font-weight: 400;
            font-size: 14px;
        }
    }
    select {
        width: 380px;
        height: 35px;
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
        padding-top: 5px;
        padding-left: 14px;
        box-shadow: 0 0 0 0;
        outline: 0;

        @media(max-width: 500px) {
            width: 250px;
            font-weight: 400;
            font-size: 14px;
        }
    }
    
    select:first-child{
        margin-bottom: 30px;
    }

    input::placeholder {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;

        @media(max-width: 500px) {
            font-weight: 400;
            font-size: 14px;
        }
    }
    button {
        width: 380px;
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
        color: #FFFFFF;
        cursor: pointer;

        @media(max-width: 500px) {
            width: 250px;
        }
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