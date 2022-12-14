import React from 'react';
import OrderFeedItem from "../../../feed/order-feed-item/order-feed-item";
import {IIngredient} from "../../../../common/interface";
import styles from "./feed-details-item.module.scss";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IFeedDetailsItem {
    ingredient: IIngredient;
    count: number;
}

const FeedDetailsItem: React.FC<IFeedDetailsItem> = ({ingredient, count}) => {
    return (
        <div className={styles.wrapper}>
            <OrderFeedItem image={ingredient.image} zIndex={1}/>
            <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
            <div className={styles.price}>
                <p className="text text_type_digits-default">{count} x {ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    );
};

export default FeedDetailsItem;