import React from 'react';
import bc from "./burger-constructor.module.scss";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredients } from '../../common/interface';

interface IBurgerConstructor {
    ingredients: IIngredients[];
}

const BurgerConstructor: React.FC<IBurgerConstructor> = ({ ingredients }) => {
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
                {ingredients.map(ing => {
                    return (
                        <div className={bc.dragItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ing.name}
                                price={ing.price}
                                thumbnail={ing.image}
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
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" htmlType="button">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

export default BurgerConstructor;