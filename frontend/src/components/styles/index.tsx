import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`

export const GameTitle = styled.h1`
font-size: 2rem;
`

export const SmallTitle = styled.h3`
font-size: 1.5rem;
`

export const Cell = styled.div`
width: 100px;
height: 100px;
border-radius: 8px;
background-color: #f0f0f0;
color: black;
font-size: 2rem;
font-weight: bold;
`

export const Row = styled.div`
display: flex;
justify-content: center;
`

export const Col = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
margin: 0 10px;
`

export const Button = styled.button`
margin: 10px 0;
padding: 10px 20px;
border-radius: 8px;
background-color: #f0f0f0;
color: black;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
min-width: 150px;
`
export const ModalContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
background-color: rgba(0, 0, 0, 0.5);
position: fixed;
top: 0;
left: 0;
`
export const ModalContent = styled.div`
background-color: white;
padding: 20px;
border-radius: 8px;
`

export const LoadingSpinner = styled.div`
width: 48px;
height: 48px;
border: 5px solid #FFF;
border-bottom-color: #FF3D00;
border-radius: 50%;
display: inline-block;
box-sizing: border-box;
animation: rotation 1s linear infinite;

@keyframes rotation {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`