import React from 'react';
import bun from "./ingredients-block.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { IIngredient } from '../../../common/interface';

interface IIngredientsBlock {
    name: string;
    ingredients: IIngredient[];
    handleModalOpen: (content: IIngredient) => void;
    refItem: React.RefObject<any>;
}

const IngredientsBlock: React.FC<IIngredientsBlock> = ({ name, ingredients , handleModalOpen, refItem }) => {

    return (
        <div ref={refItem}>
            <p className="text text_type_main-medium">
                {name}
            </p>
            <div className={bun.wrapper}>
                {ingredients.map(ing => {
                    return <IngredientItem key={ing._id} ingredient={ing} handleModalOpen={handleModalOpen} />
                })}
            </div>
        </div>
    );
};

export default IngredientsBlock;