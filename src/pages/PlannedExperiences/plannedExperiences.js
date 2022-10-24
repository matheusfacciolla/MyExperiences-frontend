import styled from 'styled-components';
import dayjs from "dayjs";
import axios from 'axios';

import { useContext, useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import { IoIosArrowDown } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

function MappingPlannedExperience(props) {
    const { DEFAULTURL } = useContext(UserContext);
    const { data, userToken, setAtt, att, setIsLoading } = props;
    const [isOpen, setIsOpen] = useState(false);

    const isCheckTrue = "#008000";
    const isCheckFalse = "#ff0000";

    function handleCheck(PlannedExperience) {
        const date1 = new Date(dayjs(Date.now()));

        let data = PlannedExperience.date;
        const dataSplit = data.split('/');
        const day = dataSplit[0];
        const month = dataSplit[1];
        const year = dataSplit[2];
        data = new Date(year, month - 1, day);
        const date2 = new Date(data);

        const res = date1.getTime() - date2.getTime();
        const diff = res / (1000 * 60 * 60 * 24);

        if (diff < 0) {
            alert("The day of this experience has not arrived yet...");
            setIsLoading(false);
            return;
        }
        const obj = { id: PlannedExperience.id, done: !PlannedExperience.done }
        const URL = `${DEFAULTURL}/experiences/planned`;
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
            const URL = `${DEFAULTURL}/experiences/planned/delete/${callback.id}`;
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
                    data.planned_experiences.map((experience, index) => {
                        return (
                            <ContainerExperiences key={index}>
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

export default MappingPlannedExperience;

const ContainerWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
    width: 400px;
    font-family: 'Lexend Deca';
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
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
    background-color: ${({ theme }) => theme.global};
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