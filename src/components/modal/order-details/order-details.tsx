import React from "react";
import order from "./order-details.module.scss";

import doneIcon from "../../../images/done.png"
import {useRequests} from "../../../hooks/useRequests";
import {IOrderInfoRequest, IOrderInfoResponse} from "../../../common/interface";
import {Requests} from "../../../utils/requests/requests";

interface IOrderDetails {
    selectedItems: IOrderInfoRequest;
}

const OrderDetails: React.FC<IOrderDetails> = ({selectedItems}) => {
    const {response} = useRequests<IOrderInfoResponse>(() => Requests.getOrderDetails(selectedItems))

    return (
        <div className={order.wrapper}>
            <p className={`text text_type_digits-large ${order.order}`}>{response?.order.number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneIcon} alt="Идентификатор заказа"/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;