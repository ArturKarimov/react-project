import React from 'react';
import ingItem from "./ingredient-item.module.scss";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "../../../common/interface";
import {useDrag} from "react-dnd";
import {useAppSelector} from "../../../hooks/redux";
import {BUN} from "../../../utils/constants";


export interface IngredientItemProps {
    ingredient: IIngredient;
    handleModalOpen: (content: IIngredient) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient, handleModalOpen}) => {

    const {ingredients} = useAppSelector(state => state.constructorReducer)

    const findIngredient = ingredients.find(el => el._id === ingredient._id);
    const filterIngredient = ingredients.filter(el => el._id === ingredient._id);
    const isBun = findIngredient?.type === BUN;
    const count = isBun ? findIngredient.count : filterIngredient.length;

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: {id: ingredient._id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    });

    const openIngredientInfoModal = React.useCallback(() => {
        handleModalOpen(ingredient)
    }, []);

    return (
        <div className={ingItem.wrapper} onClick={openIngredientInfoModal} ref={dragRef}>
            <div className={ingItem.imageWrapper}>
                <img src={ingredient.image || "asa"} alt={ingredient.name} style={{opacity}}/>
            </div>
            <div className={ingItem.price}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">
                {ingredient.name}
            </p>
            {findIngredient?.count && count && <Counter count={count} size="default"/>}
        </div>
    );
};

export default IngredientItem;