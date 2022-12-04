import React from "react";
import ReactDOM from "react-dom";
import modal from "./modal.module.scss";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {useHistory, useLocation} from "react-router-dom";
import {ILocationState} from "../../common/interface";

const modalRoot = document.getElementById("modals") as Element;

interface IModal {
    title?: string;
    width?: number;
    height?: number;
    deleteInfo?: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<IModal> = (
    {
        title = "",
        children,
        width,
        height,
        deleteInfo
    }
) => {

    const location = useLocation() as ILocationState;
    const history = useHistory();
    const [active, setActive] = React.useState<ILocationState>();
    let background = location.state && location.state?.background;

    React.useEffect(() => {
        if (background) {
            setActive(background)
        }
    }, [background])

    React.useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (background) {
            document.addEventListener("keydown", escHandler);
        }
        return () => {
            document.removeEventListener("keydown", escHandler);
        };
    }, [background]);

    const onClose = () => {
        deleteInfo && deleteInfo();
        history.replace("/")
    }

    return ReactDOM.createPortal(
            <ModalOverlay active={!!active} onClose={onClose}>
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