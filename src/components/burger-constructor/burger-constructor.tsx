import React from 'react';
import bc from "./burger-constructor.module.scss";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {DataContext} from "../../services/context";
import {Modal} from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {IIngredients} from "../../common/interface";
import {BOTTOM, BUN, TOP} from "../../utils/constants";

const BurgerConstructor = () => {
    const res = React.useContext(DataContext)
    const ingredients = res?.data;

    const [modalActive, setModalActive] = React.useState(false);
    const [ingredientsData, setIngredientsData] = React.useState<IIngredients[]>(ingredients || []);

    const bun = React.useMemo(() => ingredientsData.find(b => b.type === BUN), [ingredientsData]);

    const totalPrice = React.useMemo(() => ingredientsData.reduce((acc, el) => acc + el.price, 0), [ingredientsData]);

    const deleteIngredient = (ingredient: IIngredients) => {
        const newIngredientsData = ingredientsData.filter(el => el._id !== ingredient._id)
        setIngredientsData(newIngredientsData)
    }
    const selectedItems = {ingredients: ingredientsData.map(el => el._id)};

    const openCheckoutModal = () => {
        setModalActive(true)
    }

    return (
        <div className={bc.wrapper}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={bun?.name + TOP}
                price={bun!.price}
                thumbnail={bun!.image}
            />
            <div className={bc.innerWrapper}>
                {ingredientsData.filter(el => el.type !== BUN).map(ing => {
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
                text={bun?.name + BOTTOM}
                price={bun!.price}
                thumbnail={bun!.image}
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
                <OrderDetails selectedItems={selectedItems}/>
            </Modal>
        </div>
    );
};

export default BurgerConstructor;