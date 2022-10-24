import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext';
import Loading from '../../components/Loading';

import styled from 'styled-components';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import MappingExperiences from './Experiences';

function Experiences() {
    const { DEFAULTURL, userToken, att, setAtt } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    const URL = `${DEFAULTURL}/experiences`;

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
                    data.map(element => <MappingExperiences
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

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.global};
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
    color: ${({ theme }) => theme.text};
`;
