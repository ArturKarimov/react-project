import {configureStore, combineReducers} from "@reduxjs/toolkit";

import constructorReducer from "../constructor/constructor-slice";
import ingredientReducer from "../ingredient/ingredient-slice";
import orderReducer from "../order/order-slice";
import userReducer from "../user/user-slice";
import {ingredientsApi} from "../ingredients/ingredients-service";
import {authApi} from "../auth/auth-service";


const rootReducer = combineReducers({
    constructorReducer,
    ingredientReducer,
    orderReducer,
    userReducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [authApi.reducerPath]: authApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([ingredientsApi.middleware, authApi.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]