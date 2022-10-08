import React from 'react';
import mainStyle from "./creating-burger.module.scss";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const CreatingBurger = () => {

    return (
        <>
            <p className={`${mainStyle.title} text text_type_main-large`}>Соберите бургер</p>
            <main className={mainStyle.wrapper}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    );
};

export default CreatingBurger;