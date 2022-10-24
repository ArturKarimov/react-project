import React from 'react';
import bc from "../burger-constructor.module.scss";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "../../../common/interface";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {moveIngredient} from "../../../services/constructor/constructor-slice";

interface IDraggableItem {
    ingredient: IIngredient;
    index: number;
    deleteIngredient: (ing: IIngredient) => void;
}

interface DragItem {
    index: number
    id: string
    type: string
}

const DraggableItem: React.FC<IDraggableItem> = ({ingredient, index, deleteIngredient}) => {

    const {ingredients} = useAppSelector(state => state.constructorReducer)
    const dispatch = useAppDispatch();

    const ref = React.useRef<HTMLDivElement>(null)
    const [, drop] = useDrop<DragItem,
        void>({
        accept: "draggable-items",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = ingredients.findIndex(el => el.uniqID === item.id)
            const hoverIndex = ingredients.findIndex(el => el.uniqID === ingredient.uniqID)
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            item.index = hoverIndex
            dispatch(moveIngredient({dragIndex, hoverIndex}))
        }
    })

    const [{isDragging}, drag] = useDrag({
        type: "draggable-items",
        item: () => {
            return {id: ingredient.uniqID, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const onDeleteIconClick = () => {
        deleteIngredient(ingredient)
    }

    return (
        <div className={bc.dragItem} ref={ref} style={{opacity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={onDeleteIconClick}
            />
        </div>
    )
};

export default DraggableItem;