import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import Loading from '../../components/Loading';

import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

function Experiences() {
    const { userToken, att, setAtt } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const URL = 'http://localhost:5000/experiences';

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
    }, [!att]);

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
                <H1>Experiences</H1>
                {
                    data.map(element => <MappingExperience
                        data={element}
                        key={element.id}
                        userToken={userToken}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        setAtt={setAtt}
                        att={att} />)
                }
                <Navigation />
            </ContainerContent>
    );
}

export default Experiences;

function MappingExperience(props) {
    const { data, setIsLoading, setAtt, att, userToken } = props;
    const [isOpen, setIsOpen] = useState(false);

    function handleDelete(callback) {
        if (window.confirm("Do you want to delete this experience?")) {
            const URL = `http://localhost:5000/experiences/${callback.done ? "planned/" : ""}delete/${callback.id}`;
            const config = { headers: { Authorization: `Bearer ${userToken}` } };
            axios.delete(URL, config);
            setAtt(!att);
            setIsLoading(false);
        }
    }

    console.log(data)

    return (
        <ContainerWrap>
            <ContainerCategories>
                <h1>{data.category}</h1>
                <IoIosArrowDown onClick={() => setIsOpen(!isOpen)}></IoIosArrowDown>
            </ContainerCategories>
            {
                isOpen ?
                    data.experiences.map(experience => {
                        return (
                            <ContainerExperiences>
                                <div>
                                    <p>{experience.title}</p>
                                    <p>{experience.place}</p>
                                    <p>{experience.description}</p>
                                    <p>{experience.date}</p>
                                </div>
                                <AiFillDelete onClick={() => { handleDelete({ ...experience }) }} />
                            </ContainerExperiences>
                        );
                    })
                    :
                    <></>
            }
            {
                isOpen && data.planned_experiences.length > 0 ?
                    data.planned_experiences.map(planned_experience => {
                        return (
                            <ContainerExperiences>
                                <div>
                                    <p>{planned_experience.title}</p>
                                    <p>{planned_experience.place}</p>
                                    <p>{planned_experience.description}</p>
                                    <p>{planned_experience.date}</p>
                                </div>
                                <AiFillDelete onClick={() => { handleDelete({ ...planned_experience }) }} />
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
    border-radius: 5px;
`;

const ContainerCategories = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;

    h1 {
        margin: 3px;
        font-size: 26px;
        margin-left: 20px;
    }

    svg {
        color: white;
        font-size: 30px;
        margin-right: 20px;
        cursor: pointer;
    }
`;

const ContainerExperiences = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    background-color: #8b82c3;
    font-family: 'Lexend Deca';

    div {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }

    p {
        font-size: 20px;
        max-height: 100%;
        max-width: 330px;
        word-wrap: normal;
        word-wrap: break-word;
    }

    svg {
        font-size: 30px;
        cursor: pointer;
        margin-right: 20px;
    }
`;