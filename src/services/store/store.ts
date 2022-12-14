import {configureStore, combineReducers} from "@reduxjs/toolkit";

import constructorReducer from "../constructor/constructor-slice";
import ingredientReducer from "../ingredient/ingredient-slice";
import ingredientsReducer from "../ingredients/ingredients-slice";
import orderReducer from "../order/order-slice";
import userReducer from "../user/user-slice";
import {webSocketApi} from "../sockets/web-sockets";
import {ingredientsApi} from "../ingredients/ingredients-service";
import {authApi} from "../auth/auth-service";
import {feedApi} from "../feed/feed-service";


const rootReducer = combineReducers({
    constructorReducer,
    ingredientReducer,
    ingredientsReducer,
    userReducer,
    orderReducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [webSocketApi.reducerPath]: webSocketApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([ingredientsApi.middleware, authApi.middleware, feedApi.middleware, webSocketApi.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]