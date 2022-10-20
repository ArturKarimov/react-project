import React from "react";
import order from "./order-details.module.scss";

import doneIcon from "../../../images/done.png"
import {IOrderInfoRequest} from "../../../common/interface";
import {ingredientsApi} from "../../../services/ingredients/ingredients-service";
import Loading from "../../loading/loading";

interface IOrderDetails {
    selectedItems: IOrderInfoRequest;
}

const OrderDetails: React.FC<IOrderDetails> = ({selectedItems}) => {
    const [getOrderInfo, { data, isLoading, error }] = ingredientsApi.useFetchOrderInfoMutation({fixedCacheKey: "orderCashe"})

    React.useEffect(() => {
        getOrderInfo(selectedItems)
    }, []);

    if (error) {
        return (
            <div className={order.wrapper}>
                <p className="text text_type_main-medium">Произошла ошибка. Повторите снова</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className={order.wrapper}>
                <Loading />
            </div>
        )
    }

    return (
        <div className={order.wrapper}>
            <p className={`text text_type_digits-large ${order.order}`}>{data?.order.number}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneIcon} alt="Идентификатор заказа"/>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;