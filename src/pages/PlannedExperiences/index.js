import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

import UserContext from '../../contexts/UserContext';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

function PlannedExperiences() {
    const { userToken, att, setAtt } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const URL = 'http://localhost:5000/experiences/planned';

    useEffect(() => {
        const promise = axios.get(URL, config);
        promise.then((response) => {
            setData(response.data);
            setIsLoading(false);
        });
        promise.catch(error => {
            alert("Deu algum erro...");
            setIsLoading(false);
        });
    // eslint-disable-next-line
    }, [att]);

    return (
        isLoading ?
            <ContainerContent>
                <Header />
                <Loading />
                <Navigation />
            </ContainerContent>
            :
            <ContainerContent>
                <Header />
                <H1>Planned Experiences</H1>
                {
                    data.map(element => <MappingPlannedExperience
                        data={element}
                        key={element.id}
                        userToken={userToken}
                        setAtt={setAtt}
                        att={att}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading} />)
                }
                <Navigation />
            </ContainerContent>
    );
}

export default PlannedExperiences;

function MappingPlannedExperience(props) {
    const { data, userToken, setAtt, att, setIsLoading } = props;
    const [isOpen, setIsOpen] = useState(false);


    const isCheckTrue = "#008000";
    const isCheckFalse = "#ff0000";

    function handleCheck(PlannedExperience) {
        const obj = { id: PlannedExperience.id, done: !PlannedExperience.done }
        const URL = `http://localhost:5000/experiences/planned`;
        const config = { headers: { Authorization: `Bearer ${userToken}` } };
        const promise = axios.put(URL, obj, config);

        promise.then((response) => {
            setAtt(!att)
            setIsLoading(false);
        });
        promise.catch(error => {
            setIsLoading(false);
            alert("Deu algum erro...");
        });
    }

    function handleDelete(callback) {
        if (window.confirm("Você deseja excluir esta experiencia")) {
            const URL = `http://localhost:5000/experiences/planned/delete/${callback.id}`;
            const config = { headers: { Authorization: `Bearer ${userToken}` } };
            axios.delete(URL, config);
            setAtt(!att);
            setIsLoading(false);
        }
    }

    return (
        <ContainerWrap>
            <ContainerCategories>
                <h1>{data.category}</h1>
                <IoIosArrowDown onClick={() => setIsOpen(!isOpen)} />
            </ContainerCategories>
            {
                isOpen ?
                    data.planned_experiences.map(experience => {
                        return (
                            <ContainerExperiences>
                                <div>
                                    <p>{experience.title}</p>
                                    <p>{experience.place}</p>
                                    <p>{experience.desciption}</p>
                                    <p>{experience.date}</p>
                                </div>
                                <div>
                                    <BsCheckCircleFill color={experience.done ? isCheckTrue : isCheckFalse} onClick={() => { handleCheck({ ...experience }) }} />
                                    <AiFillDelete onClick={() => { handleDelete({ ...experience }) }} />
                                </div>
                            </ContainerExperiences>
                        );
                    })
                    :
                    <></>
            }
        </ContainerWrap>
    );
}

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #7e72c7;
    width: 500px;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 90px;
    margin-bottom: 90px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const H1 = styled.h1`
    margin-bottom: 50px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 29px;
    color: white;
`;

const ContainerWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
    width: 400px;
    background-color: #5745c6;
    font-family: 'Lexend Deca';
    color: white;
    position: relative;
    border-radius: 5px;
`;

const ContainerCategories = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;

    h1 {
        margin: 3px;
        font-size: 26px;
    }

    svg {
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
`;

const ContainerExperiences = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    background-color: #8b82c3;
    font-family: 'Lexend Deca';
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;

    p {
        font-size: 20px;
    }
    
    div:first-child {
        display: flex;
        flex-direction: column;
    }

    svg {
        font-size: 30px;
        cursor: pointer;
        margin-right: 10px;
    }
`;