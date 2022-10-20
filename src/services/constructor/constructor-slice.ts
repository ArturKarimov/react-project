import {IIngredient} from "../../common/interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BUN} from "../../utils/constants";

interface IConstructorState {
    ingredients: IIngredient[];
    bun?: IIngredient;
}

interface IPayloadAction {
    ingredient: IIngredient;
    uniqID?: string;
}

interface IMovePayloadAction {
    dragIndex: number;
    hoverIndex: number;
}

const initialState: IConstructorState = {
    ingredients: []
}

export const constructorSlice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        addIngredient: (state: IConstructorState, action: PayloadAction<IPayloadAction>) => {
            const draggedElement = action.payload.ingredient;
            const findElement = state.ingredients.find(el => el._id === draggedElement._id);
            state.ingredients.push({
                ...action.payload.ingredient,
                uniqID: action.payload.uniqID,
                count: findElement && findElement.count ? findElement.count++ : 1
            })
        },
        deleteIngredient: (state: IConstructorState, action: PayloadAction<IPayloadAction>) => {
            const findElement = state.ingredients.find(el => el._id === action.payload.ingredient._id);
            const decreaseCountElement = {
                ...findElement,
                count: findElement?.count ? findElement.count-- : 0
            }
            state.ingredients = state.ingredients.filter(ing => ing.uniqID !== action.payload.ingredient.uniqID)
            state.ingredients.map((el) => el._id === findElement?._id ? decreaseCountElement : el)
        },
        addBun: (state: IConstructorState, action: PayloadAction<IPayloadAction>) => {
            const bun = state.ingredients.find(ing => ing.type === BUN);
            if (!bun) {
                state.ingredients.push({
                    ...action.payload.ingredient,
                    uniqID: action.payload.uniqID,
                    count: 2
                })
            } else {
                state.ingredients = state.ingredients.filter(ing => ing.type !== BUN)
                state.ingredients.push({
                    ...action.payload.ingredient,
                    uniqID: action.payload.uniqID,
                    count: 2
                })
            }
        },
        moveIngredient: (state: IConstructorState, action: PayloadAction<IMovePayloadAction>) => {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;
            state.ingredients.splice(hoverIndex, 0, state.ingredients.splice(dragIndex, 1)[0]);
        }
    }
})

export default constructorSlice.reducer