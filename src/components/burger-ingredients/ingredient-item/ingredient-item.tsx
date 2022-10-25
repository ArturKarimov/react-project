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

    const {ingredients, bun} = useAppSelector(state => state.constructorReducer);

    const isBun = React.useMemo(() => {
        return ingredient?.type === BUN && ingredient._id === bun?._id
    }, [ingredient, bun]);

    const count = isBun ? bun?.count : ingredients.filter(el => {
        return el._id === ingredient._id
    }).length;

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
            {!!count && <Counter count={count} size="default"/>}
        </div>
    );
};

export default IngredientItem;