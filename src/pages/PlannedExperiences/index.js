import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";

import UserContext from '../../contexts/UserContext';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

function PlannedExperiences() {
    const { userInformation, att, setAtt } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${userInformation.token}`
        }
    }
    const URL = 'http://localhost:5000/experiences/planned';

    useEffect(() => {
        const promise = axios.get(URL, config);
        promise.then((response) => {
            console.log("passou aqui em", response.data)
            setData(response.data);
            setIsLoading(false);
            console.log("ISLOADING1 -> ", isLoading)
        });
        promise.catch(error => {
            alert("Deu algum erro...");
            setIsLoading(false);
        });
    }, [att]);

    console.log("planned_experiences -> ", data)

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
                {
                    data.map(element => <MappingExperience
                        data={element}
                        key={element.id}
                        userInformation={userInformation}
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

function MappingExperience(props) {
    const { data, userInformation, setAtt, att, setIsLoading, isLoading } = props;
    const [isOpen, setIsOpen] = useState(false);

    const isCheckTrue = "#008000";
    const isCheckFalse = "#ff0000";

    function handleCheck(callback) {
        const obj = { id: callback.id, done: !callback.done }
        const URL = `http://localhost:5000/experiences/planned`;
        const config = { headers: { Authorization: `Bearer ${userInformation.token}` } };
        const promise = axios.put(URL, obj, config);

        promise.then((response) => {
            setAtt(!att)
            setIsLoading(false);
            console.log("ISLOADING2222 -> ", isLoading)
            console.log("aqui", response)
        });
        promise.catch(error => {
            setIsLoading(false);
            alert("Deu algum erro...");
        });
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
                                <BsCheckCircleFill color={experience.done ? isCheckTrue : isCheckFalse} onClick={() => { handleCheck({ ...experience }) }} />
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
    background-color: red;
    width: 300px;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const ContainerWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
    width: 300px;
    background-color: blue;
    position: relative;
`;

const ContainerCategories = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;

    h1 {
        margin: 3px;
    }
`;

const ContainerExperiences = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    border: 2px solid #E7E7E7;
    background-color: purple;
    
    div {
        display: flex;
        flex-direction: column;
    }

    svg {
        font-size: 30px;
        cursor: pointer;
        color: ${props => props.isCheck};
    }
`;