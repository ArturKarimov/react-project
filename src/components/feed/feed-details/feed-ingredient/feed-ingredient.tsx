import React from 'react';
import styles from "./feed-ingredient.module.scss";
import {FeedStatus} from "../../feed-item/feed-item";
import {useAppSelector} from "../../../../hooks/redux";

const FeedIngredient = () => {
    const {ingredients} = useAppSelector(state => state.ingredientsReducer);

    return (
        <div>
            <p className="text text_type_digits-default">#034533</p>
            <p className="text text_type_main-medium">
                Black Hole Singularity острый бургер
            </p>
            <p className={`${"done" === FeedStatus.Done ? styles.statusDone : ""} text text_type_main-default`}>
                Выполнен
            </p>
            <p className="text text_type_main-medium">
                Состав:
            </p>
        </div>
    );
};

export default FeedIngredient;