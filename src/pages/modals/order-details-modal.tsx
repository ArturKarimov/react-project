import React from 'react';
import {Modal} from "../../components/modal/modal";
import {useHistory} from "react-router-dom";
import OrderDetails from "../../components/modal/order-details/order-details";

const OrderDetailsModal = () => {
    const history = useHistory();

    const onClose = () => {
        history.replace("/")
    }

    return (
        <Modal width={720} height={718} onClose={onClose}>
            <OrderDetails/>
        </Modal>
    );
};

export default OrderDetailsModal;