import React from 'react';
import styles from "./feed-details.module.scss";
import {FeedStatus} from "../feed-item/feed-item";

const FeedDetails = () => {

    return (
        <div>
            <p className={`${styles.order} text text_type_digits-default`}>#034533</p>
            <p className={`${styles.title} text text_type_main-medium`}>
                Black Hole Singularity острый бургер
            </p>
            <p className={`${"done" === FeedStatus.Done ? styles.statusDone : ""} 
            ${styles.status} text text_type_main-default`}
            >
                Выполнен
            </p>
            <p className={`${styles.ingredientsTitle} text text_type_main-medium`}>
                Состав:
            </p>
        </div>
    );
};

export default FeedDetails;