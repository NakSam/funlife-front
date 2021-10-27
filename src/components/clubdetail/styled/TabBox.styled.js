import styled from "styled-components";

export const TabsWrapper = styled.div`
    width: 100%;
    font-family: 'S-CoreDream-4Regular';
    border: 2px solid #ededed;
    border-radius: 0.7rem;
`;

export const TabsTitleWrapper = styled.div`
    display: flex;
    background-color: #ededed;
    cursor:pointer;
`;

export const TabsTitle1 = styled.div`
    font-family: 'S-CoreDream-6Bold';
    text-align:center;
    width: 50%;
    padding: 0.7rem;
    background-color:${props => {
        if (props.tab === 1) {
            return '#a1a1a1'
        }
    }};
`;

export const TabsTitle2 = styled.div`
    font-family: 'S-CoreDream-6Bold';
    text-align:center;
    width: 50%;
    padding: 0.7rem;
    background-color:${props => {
        if (props.tab === 2) {
            return '#a1a1a1'
        }
    }};
`;

export const TabsBodyWrapper = styled.div``;

export const TabsBody = styled.div`
    font-family: 'S-CoreDream-4Regular';
    padding:"0.5rem;
`;