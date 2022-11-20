import React from 'react';
import bc from "./burger-constructor.module.scss";
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BOTTOM, BUN, defaultBun, TOP} from "../../utils/constants";
import {ingredientsApi} from "../../services/ingredients/ingredients-service";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addBun, addIngredient, clearConstructor} from "../../services/constructor/constructor-slice";
import {useDrop} from "react-dnd";
import EmptyDropTarget from "./empty-drop-target/empty-drop-target";
import DraggableItems from "./draggable-items/draggable-items";
import Loading from "../loading/loading";
import {clearOrder, orderInfo} from "../../services/order/order-slice";
import {useHistory, useLocation} from "react-router-dom";

interface IDropData {
    id: string
}

const BurgerConstructor = () => {
    const {ingredients} = useAppSelector(state => state.ingredientsReducer)
    const {isAuth} = useAppSelector(state => state.userReducer)
    const {ingredients: constructorIngredients, bun: bunItem} = useAppSelector(state => state.constructorReducer)
    const [getOrderInfo, {
        isLoading,
        error
    }] = ingredientsApi.useFetchOrderInfoMutation()

    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();

    const totalPrice = React.useMemo(() => {
        return constructorIngredients.reduce((acc, el) => acc + el.price, (bunItem ? bunItem?.price * 2 : 0))
    }, [constructorIngredients, bunItem]);

    const selectedItems = bunItem ?
        {ingredients: [bunItem?._id, ...constructorIngredients.map(el => el._id), bunItem?._id]}
        : undefined

    const onDropHandler = (id: IDropData) => {
        const draggedIngredient = ingredients?.find(ing => ing._id === id.id);
        if (draggedIngredient && draggedIngredient.type !== BUN) {
            dispatch(addIngredient({ingredient: draggedIngredient}))
        } else if (draggedIngredient?.type === BUN) {
            dispatch(addBun({ingredient: draggedIngredient}))
        }
    }

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId: IDropData) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const openCheckoutModal = () => {
        if (isAuth) {
            selectedItems && getOrderInfo(selectedItems).then((res) => {
                if("data" in res){
                    if (res?.data?.success && !error) {
                        dispatch(orderInfo(res.data))
                        history.replace({pathname: `/order/${res?.data.order.number}`, state: {background: location}});
                        dispatch(clearConstructor())
                    }
                    if (error || !res?.data?.success) {
                        dispatch(clearOrder())
                    }
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
            {isLoading && <Loading/>}
        </div>
    );
};

export default BurgerConstructor;