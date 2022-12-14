import {IOrderInfo} from "../../common/interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface OrderState {
    order?: IOrderInfo;
}

const initialState: OrderState = {
    order: undefined
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderInfo: (state, action: PayloadAction<IOrderInfo>) => {
            state.order = action.payload;
        },
        clearOrder: (state) => {
            state.order = undefined
        }
    }
})

export const {orderInfo, clearOrder} = orderSlice.actions;
export default orderSlice.reducer;