import {IIngredient} from "../../common/interface";
import {createSlice, PayloadAction, nanoid} from "@reduxjs/toolkit";

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
        addIngredient: {
            reducer: (state: IConstructorState, action: PayloadAction<IPayloadAction>) => {
                const draggedElement = action.payload.ingredient;
                const findElement = state.ingredients.find(el => el._id === draggedElement._id);
                state.ingredients.push({
                    ...action.payload.ingredient,
                    uniqID: action.payload.uniqID,
                    count: findElement && findElement.count ? findElement.count++ : 1
                })
            },
            prepare: (action: IPayloadAction) => {
                const id = nanoid();
                return { payload: { uniqID: id, ingredient: action.ingredient } }
            }
        },
        deleteIngredient: (state: IConstructorState, action: PayloadAction<IPayloadAction>) => {
            state.ingredients = state.ingredients.filter(ing => ing.uniqID !== action.payload.ingredient.uniqID)
        },
        addBun: (state: IConstructorState, action: PayloadAction<IPayloadAction>) => {
            state.bun = {
                ...action.payload.ingredient,
                count: 2
            }
        },
        moveIngredient: (state: IConstructorState, action: PayloadAction<IMovePayloadAction>) => {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;
            state.ingredients.splice(hoverIndex, 0, state.ingredients.splice(dragIndex, 1)[0]);
        }
    }
})

export const {addIngredient, addBun, deleteIngredient, moveIngredient} = constructorSlice.actions;
export default constructorSlice.reducer