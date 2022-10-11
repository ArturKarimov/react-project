import React from 'react';
import burgerIng from "./burger-ingredients.module.scss";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsBlock from "./ingredients-block.tsx/ingredients-block";
import { DataContext } from "../app";
import { Modal } from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { IIngredients } from "../../common/interface";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    const [modalActive, setModalActive] = React.useState(false);
    const [modalData, setModalData] = React.useState<IIngredients>({} as IIngredients)

    const res = React.useContext(DataContext)
    const data = res.data;

    const buns = data.filter(el => el.type === "bun");
    const sauces = data.filter(el => el.type === "sauce");
    const main = data.filter(el => el.type === "main");

    const handleModalOpen = (content: IIngredients) => {
        setModalData(content)
        setModalActive(true)
    }

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
                    <IngredientsBlock name={"Булки"} ingredients={buns} handleModalOpen={handleModalOpen} />
                    <IngredientsBlock name={"Соусы"} ingredients={sauces} handleModalOpen={handleModalOpen} />
                    <IngredientsBlock name={"Начинки"} ingredients={main} handleModalOpen={handleModalOpen} />
                </div>
                <Modal title="Детали ингредиента" active={modalActive} setActive={setModalActive} width={720}>
                    <IngredientDetails ingredient={modalData}/>
                </Modal>
            </section>
    );
};

export default BurgerIngredients;