import React from 'react';
import bc from "./burger-constructor.module.scss";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from "../app";
import { Modal } from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { IIngredients } from "../../common/interface";

const BurgerConstructor = () => {
    const res = React.useContext(DataContext)
    const ingredients = res.data;

    const [modalActive, setModalActive] = React.useState(false);
    const [ingredientsData, setIngredientsData] = React.useState<IIngredients[]>(ingredients);

    const totalPrice = ingredientsData.reduce((acc, el) => acc + el.price, 0)

    const deleteIngredient = (ingredient: IIngredients) => {
        const newIngredientsData = ingredientsData.filter(el => el._id !== ingredient._id)
        setIngredientsData(newIngredientsData)
    }

    const openCheckoutModal = React.useCallback(() => {
        setModalActive(true);
    }, []);

    return (
        <div className={bc.wrapper}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={ingredients[0].name + " (верх)"}
                price={ingredients[0].price}
                thumbnail={ingredients[0].image}
            />
            <div className={bc.innerWrapper}>
                {ingredientsData.filter(el => el.type !== "bun").map(ing => {
                    return (
                        <div className={bc.dragItem} key={ing._id}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={ing.name}
                                price={ing.price}
                                thumbnail={ing.image}
                                handleClose={() => deleteIngredient(ing)}
                            />
                        </div>
                    )
                })}
            </div>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={ingredients[0].name + " (низ)"}
                price={ingredients[0].price}
                thumbnail={ingredients[0].image}
            />
            <div className={bc.checkoutWrapper}>
                <div className={bc.price}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" htmlType="button" onClick={openCheckoutModal}>
                    Оформить заказ
                </Button>
            </div>
            <Modal active={modalActive} setActive={setModalActive} width={720} height={718}>
                <OrderDetails/>
            </Modal>
        </div>
    );
};

export default BurgerConstructor;