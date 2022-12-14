import {IIngredient} from "../../common/interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IngredientsState {
    ingredients?: IIngredient[];
}

const initialState: IngredientsState = {
    ingredients: []
}

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setIngredients: (state, action: PayloadAction<IIngredient[]>) => {
            state.ingredients = action.payload;
        }
    }
})

export const {setIngredients} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;