import React from 'react';
import bun from "./ingredients-block.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item";
import { IIngredient } from '../../../common/interface';
import {Link, useLocation} from 'react-router-dom';

interface IIngredientsBlock {
    name: string;
    ingredients: IIngredient[];
    handleModalOpen: (content: IIngredient) => void;
    refItem: React.RefObject<HTMLDivElement>;
}

const IngredientsBlock: React.FC<IIngredientsBlock> = ({ name, ingredients , handleModalOpen, refItem }) => {

    const location = useLocation();

    return (
        <div ref={refItem}>
            <p className="text text_type_main-medium">
                {name}
            </p>
            <div className={bun.wrapper}>
                {ingredients.map(ing => {
                    return <Link
                        to={{
                            pathname: `/ingredients/${ing._id}`,
                            state: { background: location }
                        }}
                        key={ing._id}
                    >
                            <IngredientItem ingredient={ing} handleModalOpen={handleModalOpen} />
                        </Link>
                })}
            </div>
        </div>
    );
};

export default IngredientsBlock;