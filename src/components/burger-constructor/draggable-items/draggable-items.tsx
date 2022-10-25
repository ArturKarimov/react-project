import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import DraggableItem from "./draggable-item";
import {IIngredient} from "../../../common/interface";
import {deleteIngredient} from "../../../services/constructor/constructor-slice";

const DraggableItems = () => {
    const dispatch = useAppDispatch();
    const {ingredients} = useAppSelector(state => state.constructorReducer)

    const deleteIngredientItem = (ingredient: IIngredient) => {
        dispatch(deleteIngredient({ingredient}))
    }

    return (
        <>
            {ingredients.map((ing, index) => {
                return (
                    <DraggableItem
                        ingredient={ing}
                        index={index}
                        key={ing.uniqID}
                        deleteIngredient={() => deleteIngredientItem(ing)}
                    />
                )
            })}
        </>
    )
};

export default DraggableItems;