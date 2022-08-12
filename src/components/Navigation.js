import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <Foot>
            <PlannedExperiences>
                <Link to='/experiences/planned'>
                    <button>Planned Experiences</button>
                </Link>
            </PlannedExperiences>
            <SeparadorVertical />
            <NewRegister>
                <Link to='/create'>
                    <button>New Register</button>
                </Link>
            </NewRegister>
            <SeparadorVertical />
            <Experiences>
                <Link to='/experiences'>
                    <button>Experiences</button>
                </Link>
            </Experiences>
        </Foot>
    );
}

export default Navigation;

const Foot = styled.div`
    width: 100%;
    height: 70px;
    background: #5745c6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
`;

const PlannedExperiences = styled.div`
    button {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        color: white;
        background: #5745c6;
        border: none;
        cursor: pointer;
    }
`;

const Experiences = styled.div`
    button {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        color: white;
        background: #5745c6;
        border: none;
        cursor: pointer;
    }
`;

const NewRegister = styled.div`
    button {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 29px;
        color: white;
        background: #5745c6;
        border: none;
        cursor: pointer;
    }
`;

const SeparadorVertical = styled.div`
    height: 40px;
    border-right: 3px solid #ffffff;
`;