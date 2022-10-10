import React from 'react';
import ingItem from "./ingredient-item.module.scss";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredients } from "../../../common/interface";

export interface IngredientItemProps {
    ingredient: IIngredients;
    handleModalOpen: (content: IIngredients) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient, handleModalOpen }) => {

    const openIngredientInfoModal = React.useCallback(() => {
        handleModalOpen(ingredient)
    }, []);

    return (
        <>
            <div className={ingItem.wrapper} onClick={openIngredientInfoModal}>
                <div className={ingItem.imageWrapper}>
                    <img src={ingredient.image} alt={ingredient.name}/>
                </div>
                <div className={ingItem.price}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className="text text_type_main-default">
                    {ingredient.name}
                </p>
                <Counter count={2} size="default"/>
            </div>
        </>
    );
};

export default IngredientItem;