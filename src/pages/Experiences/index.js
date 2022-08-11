import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import Loading from '../../components/Loading';

import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

function Experiences() {
    const { userInformation } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${userInformation.token}`
        }
    }
    const URL = 'http://localhost:5000/experiences';

    useEffect(() => {
        const promise = axios.get(URL, config);
        promise.then((response) => {
            setData(response.data);
            setIsLoading(!isLoading);
        });
        promise.catch(error => {
            alert("Deu algum erro...");
            setIsLoading(!isLoading);
        });
    }, []);

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
                    data.map(element => <MappingExperience data={element} key={element.id} />)
                }
                <Navigation />
            </ContainerContent>
    );
}

export default Experiences;

function MappingExperience(props) {
    const { data } = props;
    const [isOpen, setIsOpen] = useState(false);

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
                                <p>{experience.title}</p>
                                <p>{experience.place}</p>
                                <p>{experience.desciption}</p>
                                <p>{experience.date}</p>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    border: 2px solid #E7E7E7;
    background-color: green;

    /* p {
        margin-top: 3px;
        margin-bottom: 3px;
    } */
`;