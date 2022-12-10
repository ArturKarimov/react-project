import React from 'react';
import styles from "./feed.module.scss";
import FeedItem from "../../components/feed/feed-item/feed-item";
import {useGetOrdersQuery} from "../../services/sockets/web-sockets";
import OrderList from "../../components/feed/order-list/order-list";
import {Link, useLocation} from 'react-router-dom';
import Loading from "../../components/loading/loading";
import {ALL_FEED_URL} from "../../utils/constants";

const Feed = () => {

    const {data} = useGetOrdersQuery(ALL_FEED_URL);
    const location = useLocation();

    if (!data) {
        return null
    }

    if (!data.success) {
        return <Loading />
    }

    return (
        <div className={styles.wrapper}>
            <p className={`${styles.title} text text_type_main-large`}>Лента заказов</p>
            <div className={styles.sections}>
                <section className={styles.feedSection}>
                    {data!.orders.map((order) =>
                        <Link
                            to={{
                            pathname: `/feed/${order.number}`,
                            state: { background: location }
                        }}
                            key={order._id}
                        >
                            <FeedItem
                                order={order}
                            />
                        </Link>
                    )}
                </section>
                <section className={styles.feedSection}>
                    <OrderList orders={data!} />
                </section>
            </div>
        </div>
    );
};

export default Feed;