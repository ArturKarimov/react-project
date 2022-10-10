import React from "react";
import ing from "./ingredient-details.module.scss";
import {IIngredients} from "../../../common/interface";

enum Characteristics {
    Calories = "Калории, ккал",
    Proteins = "Белки, г",
    Fats = "Жиры, г",
    Carbohydrates = "Углеводы, г"
}

export interface IIngredientDetails {
    ingredient: IIngredients;
}

const IngredientDetails: React.FC<IIngredientDetails> = ({ ingredient}) => {

    const getInfo = (name: Characteristics, quantity: number) => {
        return (
            <div className={ing.info}>
                <p className="text text_type_main-default">{name}</p>
                <p className="text text_type_digits-default">{quantity}</p>
            </div>
        )
    }

    return (
        <div className={ing.wrapper}>
            <div className={ing.imageWrapper}>
                <img src={ingredient.image_large} alt={ingredient.name}/>
            </div>
            <p className="text text_type_main-medium">{ingredient.name}</p>
            <div className={ing.characteristics}>
                {getInfo(Characteristics.Calories, ingredient.calories)}
                {getInfo(Characteristics.Proteins, ingredient.proteins)}
                {getInfo(Characteristics.Fats, ingredient.fat)}
                {getInfo(Characteristics.Carbohydrates, ingredient.carbohydrates)}
            </div>
        </div>
    );
};

export default IngredientDetails;