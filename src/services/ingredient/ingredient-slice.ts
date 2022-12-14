import {IIngredient} from "../../common/interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IngredientState {
    ingredient?: IIngredient;
}

const initialState: IngredientState = {
    ingredient: undefined
}

export const ingredientSlice = createSlice({
    name: "ingredient",
    initialState,
    reducers: {
        getIngredientInfo: (state, action: PayloadAction<IIngredient>) => {
            state.ingredient = action.payload;
        },
        deleteIngredientInfo: (state) => {
            state.ingredient = undefined
        }
    }
})

export const {getIngredientInfo, deleteIngredientInfo} = ingredientSlice.actions;
export default ingredientSlice.reducer;