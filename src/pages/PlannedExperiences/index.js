import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import moment from 'moment';

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
    const URL = 'https://projectmyexperiences.herokuapp.com/experiences/planned';

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
        const date2 = moment(PlannedExperience.date);
        const date1 = moment(dayjs(Date.now()).format("DD-MM-YYYY"))
        const diff = date1.diff(date2, 'day');

        if(diff < 0){
            alert("The day of this experience has not arrived yet...");
            setIsLoading(false);
            return;
        }
        const obj = { id: PlannedExperience.id, done: !PlannedExperience.done }
        const URL = `https://projectmyexperiences.herokuapp.com/experiences/planned`;
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
        if (window.confirm("Do you want to delete this planned experience?")) {
            const URL = `https://projectmyexperiences.herokuapp.com/experiences/planned/delete/${callback.id}`;
            const config = { headers: { Authorization: `Bearer ${userToken}` } };
            axios.delete(URL, config);
            setAtt(!att);
            setIsLoading(false);
        }
    }

    return (
        <ContainerWrap>
            <ContainerCategories>
                <div>
                    <h1>{data.category}</h1>
                    <p>{`(${data.planned_experiences === 0 ? 0 : data.planned_experiences.length})`}</p>
                </div>
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
                                    <p>{experience.description}</p>
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
    margin-top: 90px;
    margin-bottom: 90px;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    @media(max-width: 500px) {
        text-align: center;
        width: 300px;
    }
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

    @media(max-width: 500px) {
        width: 80%;
    }
`;

const ContainerCategories = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;

    div {
        display: flex;
        align-items: center;
        h1 {
            margin: 3px;
            font-size: 26px;
            margin-left: 20px;
        }
        p {
            margin-left: 12px;
            font-size: 20px;
        }
    }

    svg {
        color: white;
        font-size: 30px;
        margin-right: 20px;
        cursor: pointer;
    }
`;

const ContainerExperiences = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8b82c3;
    font-family: 'Lexend Deca';
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;

    p {
        font-size: 20px;
    }
    
    div:first-child {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }

    div:last-child {
        margin-right: 25px;
    }

    svg {
        font-size: 30px;
        cursor: pointer;
        margin-right: 5px;
    }
`;