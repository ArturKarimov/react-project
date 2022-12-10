import React from 'react';
import styles from "./history-orders.module.scss";

import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import FeedItem from "../../components/feed/feed-item/feed-item";
import {useGetOrdersQuery} from "../../services/sockets/web-sockets";
import {Cookie} from "../../utils/cookie";
import {Link, useLocation} from "react-router-dom";
import Loading from "../../components/loading/loading";
import {HISTORY_FEED_URL} from "../../utils/constants";

const HistoryOrders = () => {
    const accessToken = Cookie.getCookie("accessToken")?.split(" ")[1]
    const {data} = useGetOrdersQuery(`${HISTORY_FEED_URL}${accessToken}`);

    const location = useLocation();

    return (
        <section className={styles.wrapper}>
            <ProfileNavigation/>
            {data?.success ?
                <section className={styles.feedSection}>
                    {data?.orders && [...data.orders].reverse().map((order) =>
                        <Link
                            to={{
                                pathname: `/profile/orders/${order.number}`,
                                state: {background: location}
                            }}
                            key={order._id}
                        >
                            <FeedItem
                                order={order}
                            />
                        </Link>)}
                </section> :
                <Loading/>
            }

        </section>
    );
};

export default HistoryOrders;