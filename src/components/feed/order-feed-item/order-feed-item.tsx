import React from 'react';
import styles from "./order-feed-item.module.scss";

interface IOrderFeedItem {
    image: string;
    zIndex: number;
    otherNumber?: number;
}

const OrderFeedItem: React.FC<IOrderFeedItem> = ({ image, zIndex, otherNumber }) => {
    const opacity = otherNumber ? 0.6 : 1;

    return (
        <div className={styles.wrapper} style={{ zIndex }}>
            <div className={styles.innerWrapper}>
                <img src={image} alt={image} style={{ opacity }}/>

                {otherNumber && <span className={styles.otherFeed}>+{otherNumber}</span>}
            </div>
        </div>
    );
};

export default OrderFeedItem;