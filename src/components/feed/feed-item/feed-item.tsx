import React from 'react';
import styles from "./feed-item.module.scss";
import OrderFeedItem from "../order-feed-item/order-feed-item";
import {useAppSelector} from "../../../hooks/redux";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IOrdersDetails} from "../../../common/interface";
import {StatusFeed} from "../../../utils/constants";
import {FormatOrderData} from "../../../utils/formatOrderData";

interface IFeedItem {
    order: IOrdersDetails;
}

export enum FeedStatus {
    Created = "created",
    Pending = "pending",
    Done = "done"
}

const FeedItem: React.FC<IFeedItem> = ({ order }) => {
    const {ingredients} = useAppSelector(state => state.ingredientsReducer);

    const feedItems = FormatOrderData.getIngredientsById(order, ingredients!);
    const visibleFeedItems = feedItems.filter((_, i) => i <= 4);
    const totalPrice = FormatOrderData.getTotalPriceItems(feedItems as IIngredient[]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.createdAt)} />
                </p>
            </div>
            <p className="text text_type_main-medium">
                {order.name}
            </p>
            <p className={`${order.status === FeedStatus.Done ? styles.statusDone : ""} text text_type_main-default`}>
                {StatusFeed[order.status as keyof typeof StatusFeed]}
            </p>
            <div className={styles.innerWrapper}>
                <div className={styles.feedsWrapper}>
                    {visibleFeedItems?.map((ing, i) => <OrderFeedItem image={ing?.image || ""} key={ing.uniqID} zIndex={feedItems.length - i} />)}
                    {feedItems && feedItems.length > 5 &&
                        <OrderFeedItem image={feedItems?.[5].image || ""} zIndex={0} otherNumber={feedItems.length - 5} />}
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
};

export default FeedItem;