import React from 'react';
import {useLocation, useParams} from "react-router-dom";
import {feedApi} from "../../../services/feed/feed-service";
import styles from "./feed-details.module.scss";
import {StatusFeed} from "../../../utils/constants";
import {FeedStatus} from "../../feed/feed-item/feed-item";
import {useAppSelector} from "../../../hooks/redux";
import FeedDetailsItem from "./feed-details-item/feed-details-item";
import {IIngredient, ILocationState} from "../../../common/interface";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import Loading from "../../loading/loading";
import {FormatOrderData} from "../../../utils/formatOrderData";

const FeedDetails: React.FC = () => {
    const {ingredients} = useAppSelector(state => state.ingredientsReducer);

    const params = useParams<{ number: string }>()
    const {data, isLoading} = feedApi.useGetOrderDetailsQuery(params.number)
    const order = data?.orders?.[0];
    let location = useLocation() as ILocationState;

    React.useEffect(() => {
        if (location.state?.background) {
            location.state.background = null;
        }
    }, [location.state])

    const orderItems = FormatOrderData.getIngredientsById(order!, ingredients!);

    const totalPrice = FormatOrderData.getTotalPriceItems(orderItems as IIngredient[]);
    const filteredOrderItems = FormatOrderData.filterSameItems(orderItems as IIngredient[]);
    const amounts = FormatOrderData.getAmountItems(orderItems as IIngredient[]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <p className={`${styles.order} text text_type_digits-default`}>#{order?.number}</p>
                <p className={`${styles.name} text text_type_main-medium`}>{order?.name}</p>
                <p className={`${order?.status === FeedStatus.Done ? styles.statusDone : ""} 
            ${styles.status} text text_type_main-default`}>
                    {StatusFeed[order?.status as keyof typeof StatusFeed]}
                </p>
                <p className="text text_type_main-medium">Состав:</p>
                <div className={styles.innerWrapper}>
                    {amounts && filteredOrderItems?.map(item =>
                        <FeedDetailsItem key={item.uniqID} count={amounts[item._id as string]}
                                         ingredient={item as IIngredient} />)}
                </div>
            </div>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    {order && <FormattedDate date={new Date(order.createdAt)}/>}
                </p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>

    )
};

export default FeedDetails;