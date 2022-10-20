import React from 'react';
import bc from "./burger-constructor.module.scss";
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {IIngredient} from "../../common/interface";
import {BOTTOM, BUN, defaultBun, TOP} from "../../utils/constants";
import {ingredientsApi} from "../../services/ingredients/ingredients-service";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {constructorSlice} from "../../services/constructor/constructor-slice";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from "uuid";
import DraggableItem from "./draggable-item/draggable-item";
import EmptyDropTarget from "./empty-drop-target/empty-drop-target";

const BurgerConstructor = () => {
    const {data: ingredients} = ingredientsApi.useFetchAllIngredientsQuery("");
    const dispatch = useAppDispatch();
    const {deleteIngredient: deleteIngredientItem, addIngredient, addBun} = constructorSlice.actions;
    const {ingredients: constructorIngredients} = useAppSelector(state => state.constructorReducer)

    const [modalActive, setModalActive] = React.useState(false);

    const bun = React.useMemo(() => constructorIngredients.find(b => b.type === BUN), [constructorIngredients]);
    const totalPrice = React.useMemo(() => constructorIngredients.reduce((acc, el) => acc + el.price, 0), [constructorIngredients]) + (bun?.price || 0);
    const selectedItems = {ingredients: constructorIngredients.map(el => el._id)};

    const onDropHandler = (id: any) => {
        const draggedIngredient = ingredients?.data.find(ing => ing._id === id.id);
        if (draggedIngredient && draggedIngredient.type !== BUN) {
            dispatch(addIngredient({ingredient: draggedIngredient, uniqID: uuidv4()}))
        } else if (draggedIngredient?.type === BUN) {
            dispatch(addBun({ingredient: draggedIngredient, uniqID: uuidv4()}))
        }
    }

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const deleteIngredient = (ingredient: IIngredient) => {
        dispatch(deleteIngredientItem({ingredient}))
    }

    const openCheckoutModal = () => {
        setModalActive(true)
    }

    return (
        <div className={bc.wrapper}>
            <div className={`${bc.dropTarget} ${isHover ? bc.dropTargetHover : ""}`} ref={dropTarget}>
                {!constructorIngredients.length ? <EmptyDropTarget/> :
                    <>
                        <ConstructorElement
                            type="top"
                            isLocked={!bun}
                            text={(bun?.name || defaultBun.text) + TOP}
                            price={bun?.price || defaultBun.price}
                            thumbnail={bun?.image || defaultBun.image}
                            handleClose={bun ? () => deleteIngredient(bun) : () => null}
                        />
                        <div className={bc.innerWrapper}>
                            {constructorIngredients.filter(el => el.type !== BUN).map((ing, index) =>
                                <DraggableItem
                                    ingredient={ing}
                                    index={index}
                                    key={ing.uniqID}
                                    deleteIngredient={deleteIngredient}
                                />)}
                        </div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={!bun}
                            text={(bun?.name || defaultBun.text) + BOTTOM}
                            price={bun?.price || defaultBun.price}
                            thumbnail={bun?.image || defaultBun.image}
                            handleClose={bun ? () => deleteIngredient(bun) : () => null}
                        />
                    </>
                }
            </div>
            <div className={bc.checkoutWrapper}>
                <div className={bc.price}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    type="primary"
                    size="large"
                    htmlType="button"
                    disabled={constructorIngredients.length === 0}
                    onClick={openCheckoutModal}>
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