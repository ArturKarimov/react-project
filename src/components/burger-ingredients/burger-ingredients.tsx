import React from 'react';
import burgerIng from "./burger-ingredients.module.scss";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsBlock from "./ingredients-block.tsx/ingredients-block";
import { DataContext } from "../app";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    const res = React.useContext(DataContext)
    const data = res.data;

    const buns = data.filter(el => el.type === "bun");
    const sauces = data.filter(el => el.type === "sauce");
    const main = data.filter(el => el.type === "main");

    return (
            <section className={burgerIng.wrapper}>
                <div className={burgerIng.tabs}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={burgerIng.ingredientsBlockWrapper}>
                    <IngredientsBlock name={"Булки"} ingredients={buns} />
                    <IngredientsBlock name={"Соусы"} ingredients={sauces} />
                    <IngredientsBlock name={"Начинки"} ingredients={main} />
                </div>
            </section>
    );
};

export default BurgerIngredients;