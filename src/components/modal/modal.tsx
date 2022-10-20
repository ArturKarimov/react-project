import React from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.scss";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals") as Element;

interface IModal {
    title?: string;
    active: boolean;
    setActive: (isActive: boolean) => void;
    width?: number;
    height?: number;
    deleteInfo?: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<IModal> = (
    {
        title = "",
        active,
        setActive,
        children,
        width,
        height,
        deleteInfo
    }
) => {

    React.useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (active) {
            document.addEventListener("keydown", escHandler);
        }
        return () => {
            document.removeEventListener("keydown", escHandler);
        };
    }, [active]);

    const onClose = () => {
        deleteInfo && deleteInfo();
        setActive(false)
    }

    return ReactDOM.createPortal(
            <ModalOverlay active={active} onClose={onClose}>
                {active &&
                    <div className={modal.modalContent} style={{width, height}} onClick={e => e.stopPropagation()}>
                        <ModalHeader onClose={onClose} title={title}/>
                        <div className={modal.innerContent}>
                            {children}
                        </div>
                    </div>
                }
            </ModalOverlay>,
        modalRoot
    );
}