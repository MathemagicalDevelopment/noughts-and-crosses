import React from 'react'
import { WinnerState } from '../types';
import { ModalContainer, ModalContent } from './styles';

type ModalProps = {
    handleClose: () => void;
    winner: WinnerState;
}

const Modal = ({ handleClose, winner }: ModalProps) => <ModalContainer>
    <ModalContent>
        <h1>{winner === 'draw' ? 'Draw' : `${winner} wins!`}</h1>
        <button onClick={handleClose}>Close</button>
    </ModalContent>
</ModalContainer>

export default Modal