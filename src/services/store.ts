import {configureStore, combineReducers} from "@reduxjs/toolkit";

import ingredientsReducer from "./reducers/ingredients/ingredients-slice";
import {ingredientsApi} from "./reducers/ingredients/ingredients-service";


const rootReducer = combineReducers({
    ingredientsReducer,
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