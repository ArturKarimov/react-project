import React from "react";
import order from "./order-details.module.scss";

import doneIcon from "../../../images/done.png"
import {IOrderInfoResponse} from "../../../common/interface";
import {useAppSelector} from "../../../hooks/redux";

interface IOrderDetails {
    orderData?: IOrderInfoResponse;
}

const OrderDetails: React.FC<IOrderDetails> = () => {

    const { order: orderData } = useAppSelector(state => state.orderReducer)

    return (
        <div className={order.wrapper}>
            <p className={`text text_type_digits-large ${order.order}`}>{orderData?.order.number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneIcon} alt="Идентификатор заказа"/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;