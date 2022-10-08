import React from 'react';
import bun from "./ingredients-block.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { IIngredients } from '../../../common/interface';

interface IIngredientsBlock {
    name: string;
    ingredients: IIngredients[];
}

const IngredientsBlock: React.FC<IIngredientsBlock> = ({ name, ingredients }) => {

    return (
        <div>
            <p className="text text_type_main-medium">
                {name}
            </p>
            <div className={bun.wrapper}>
                {ingredients.map(ing => {
                    return <IngredientItem key={ing._id} ingredient={ing} />
                })}
            </div>
        </div>
    );
};

export default IngredientsBlock;