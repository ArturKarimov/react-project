import React from "react";
import order from "./order-details.module.scss";

import doneIcon from "../../../images/done.png"

const OrderDetails = () => {
    return (
        <div className={order.wrapper}>
            <p className={`text text_type_digits-large ${order.order}`}>034536</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneIcon} alt="Идентификатор заказа"/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;