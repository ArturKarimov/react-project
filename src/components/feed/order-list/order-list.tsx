import React from 'react';
import styles from "./order-list.module.scss";
import {IOrdersFeed} from "../../../common/interface";
import {FeedStatus} from "../feed-item/feed-item";

interface IOrderList {
    orders: IOrdersFeed;
}

const OrderList: React.FC<IOrderList> = ({ orders }) => {
    const { total, totalToday, orders: orderList } = orders;

    const doneOrders = orderList.filter(el => el.status === FeedStatus.Done);
    const pendingOrders = orderList.filter(el => el.status === FeedStatus.Pending);

    return (
        <div className={styles.mainWrapper}>
            <section className={styles.wrapper}>
                <div className={styles.innerWrapper}>
                    <p className={`${styles.title} text text_type_main-medium`}>
                        Готовы:
                    </p>
                    <div className={styles.orderList}>
                        {doneOrders.map(el => <p className="text text_type_digits-default" key={el._id}>{el.number}</p>)}
                    </div>
                </div>
                <div className={styles.innerWrapper}>
                    <p className={`${styles.title} text text_type_main-medium`}>
                        В работе:
                    </p>
                    <div className={styles.orderList}>
                        {pendingOrders.map(el => <p className="text text_type_digits-default" key={el._id}>{el.number}</p>)}
                    </div>
                </div>
            </section>
            <section>
                <p className="text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className={`${styles.orders} text text_type_digits-large`}>{total}</p>
            </section>
            <section>
                <p className="text text_type_main-medium">
                    Выполнено сегодня:
                </p>
                <p className={`${styles.orders} text text_type_digits-large`}>{totalToday}</p>
            </section>
        </div>

    );
};

export default OrderList;