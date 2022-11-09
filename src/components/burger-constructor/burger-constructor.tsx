import React from 'react';
import bc from "./burger-constructor.module.scss";
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {BOTTOM, BUN, defaultBun, TOP} from "../../utils/constants";
import {ingredientsApi} from "../../services/ingredients/ingredients-service";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addBun, addIngredient} from "../../services/constructor/constructor-slice";
import {useDrop} from "react-dnd";
import EmptyDropTarget from "./empty-drop-target/empty-drop-target";
import DraggableItems from "./draggable-items/draggable-items";
import Loading from "../loading/loading";
import {clearOrder, orderInfo} from "../../services/order/order-slice";
import {useHistory} from "react-router-dom";

const BurgerConstructor = () => {
    const {data: ingredients} = ingredientsApi.useFetchAllIngredientsQuery("");
    const {isAuth} = useAppSelector(state => state.userReducer)
    const {ingredients: constructorIngredients, bun: bunItem} = useAppSelector(state => state.constructorReducer)
    const [getOrderInfo, {
        isLoading,
        error
    }] = ingredientsApi.useFetchOrderInfoMutation({fixedCacheKey: "orderCashe"})

    const dispatch = useAppDispatch();
    const history = useHistory()
    const [modalActive, setModalActive] = React.useState(false);

    const totalPrice = React.useMemo(() => {
        return constructorIngredients.reduce((acc, el) => acc + el.price, (bunItem ? bunItem?.price * 2 : 0))
    }, [constructorIngredients, bunItem]);

    const selectedItems = bunItem ?
        {ingredients: [bunItem?._id, ...constructorIngredients.map(el => el._id), bunItem?._id]}
        : undefined

    const onDropHandler = (id: any) => {
        const draggedIngredient = ingredients?.data.find(ing => ing._id === id.id);
        if (draggedIngredient && draggedIngredient.type !== BUN) {
            dispatch(addIngredient({ingredient: draggedIngredient}))
        } else if (draggedIngredient?.type === BUN) {
            dispatch(addBun({ingredient: draggedIngredient}))
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

    const openCheckoutModal = () => {
        if (isAuth) {
            selectedItems && getOrderInfo(selectedItems).then((res: any) => {
                if (res?.data?.success && !error) {
                    dispatch(orderInfo(res.data))
                    setModalActive(true)
                }
                if (error || !res?.data?.success) {
                    dispatch(clearOrder())
                }
            })
        } else {
            history.replace({pathname: "/login"});
        }
    }

    return (
        <div className={bc.wrapper}>
            <div className={`${bc.dropTarget} ${isHover ? bc.dropTargetHover : ""}`} ref={dropTarget}>
                {!constructorIngredients.length && !bunItem ? <EmptyDropTarget/> :
                    <>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={(bunItem?.name || defaultBun.text) + TOP}
                            price={bunItem?.price || defaultBun.price}
                            thumbnail={bunItem?.image || defaultBun.image}
                        />
                        <div className={bc.innerWrapper}>
                            <DraggableItems/>
                        </div>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={(bunItem?.name || defaultBun.text) + BOTTOM}
                            price={bunItem?.price || defaultBun.price}
                            thumbnail={bunItem?.image || defaultBun.image}
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
                    disabled={!bunItem}
                    onClick={openCheckoutModal}>
                    Оформить заказ
                </Button>
            </div>
            <Modal active={modalActive} setActive={setModalActive} width={720} height={718}>
                <OrderDetails />
            </Modal>
            {isLoading && <Loading />}
        </div>
    );
};

export default BurgerConstructor;