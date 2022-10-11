import React from 'react';
import modal from "./modal-overlay.module.scss";

interface IModalOverlay {
    active: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalOverlay: React.FC<IModalOverlay> = ({ active, onClose, children }) => {
    return (
        <div className={active ? `${modal.modal} ${modal.active}` : modal.modal} onClick={onClose}>
            {children}
        </div>
    );
};

export default ModalOverlay;