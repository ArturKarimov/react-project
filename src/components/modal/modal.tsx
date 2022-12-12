import React from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.scss";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modals") as Element;

interface IModal {
    title?: string;
    width?: number;
    height?: number;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<IModal> = (
    {
        title = "",
        children,
        width,
        height,
        onClose
    }
) => {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        setActive(true)
    }, [])

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

    return ReactDOM.createPortal(
        <ModalOverlay active={active} onClose={onClose}>
            {active &&
                <div className={modal.modalContent} style={{width, height}} onClick={e => e.stopPropagation()}>
                    <div className={modal.innerContent}>
                        <ModalHeader onClose={onClose} title={title}/>
                        {children}
                    </div>
                </div>
            }
        </ModalOverlay>,
        modalRoot
    );
}