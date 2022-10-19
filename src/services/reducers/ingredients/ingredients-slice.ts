import {IIngredients} from "../../../common/interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IngredientsState {
    ingredients: IIngredients[];
    isLoading: boolean;
    hasError: boolean;
    name: string;
}

const initialState: IngredientsState = {
    ingredients: [],
    isLoading: false,
    hasError: false,
    name: ""
}

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        }
    }
})

export default ingredientsSlice.reducer