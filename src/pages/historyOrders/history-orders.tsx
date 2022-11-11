import React from 'react';
import styles from "./history-orders.module.scss";

import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

const HistoryOrders = () => {
    return (
        <section className={styles.wrapper}>
            <ProfileNavigation/>
        </section>
    );
};

export default HistoryOrders;