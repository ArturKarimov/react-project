import React from "react";
import modal from "./modal-header.module.scss";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalHeader {
    title: string;
    onClose: () => void;
}

const ModalHeader: React.FC<IModalHeader> = ({onClose, title}) => {

    return (
        <span className={modal.header}>
            <p className="text text_type_main-large">{title}</p>
            <CloseIcon type="primary" onClick={onClose}/>
        </span>
    );
};

export default ModalHeader;