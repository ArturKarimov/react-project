import React from 'react';
import mainStyle from "./creating-burger.module.scss";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from 'react-dnd';

const CreatingBurger = () => {

    return (
        <>
            <p className={`${mainStyle.title} text text_type_main-large`}>Соберите бургер</p>
            <DndProvider backend={HTML5Backend}>
                <main className={mainStyle.wrapper}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </>
    );
};

export default CreatingBurger;