import React from 'react';
import ingItem from "./ingredient-item.module.scss";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredients } from "../../../common/interface";
import { Modal } from "../../modal/modal";
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";

export interface IngredientItemProps {
    ingredient: IIngredients
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient}) => {
    const [modalActive, setModalActive] = React.useState(false);

    const openIngredientInfoModal = React.useCallback(() => {
        setModalActive(true)
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
            <Modal title="Детали ингредиента" active={modalActive} setActive={setModalActive} width={720}>
                <IngredientDetails ingredient={ingredient}/>
            </Modal>
        </>
    );
};

export default IngredientItem;