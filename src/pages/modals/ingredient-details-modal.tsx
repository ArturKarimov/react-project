import React from 'react';
import {Modal} from "../../components/modal/modal";
import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import {useHistory} from "react-router-dom";

const IngredientDetailsModal = () => {
    const history = useHistory();

    const onClose = () => {
        history.replace("/")
    }

    return (
        <Modal title="Детали ингредиента" width={720} onClose={onClose}>
            <IngredientDetails/>
        </Modal>
    );
};

export default IngredientDetailsModal;