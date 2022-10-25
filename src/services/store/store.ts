import {configureStore, combineReducers} from "@reduxjs/toolkit";

import constructorReducer from "../constructor/constructor-slice";
import ingredientReducer from "../ingredient/ingredient-slice";
import orderReducer from "../order/order-slice";
import {ingredientsApi} from "../ingredients/ingredients-service";


const rootReducer = combineReducers({
    constructorReducer,
    ingredientReducer,
    orderReducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(ingredientsApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]