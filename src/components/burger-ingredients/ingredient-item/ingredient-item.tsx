import React from 'react';
import ingItem from "./ingredient-item.module.scss";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientItemProps {
    name: string;
    price: number;
    img: string;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ name, price, img }) => {
    return (
        <div className={ingItem.wrapper}>
            <img src={img} alt={name}/>
            <div className={ingItem.price}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
                {name}
            </p>
            <Counter count={2} size="default" />
        </div>
    );
};

export default IngredientItem;