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
        orderInfo: (state: OrderState, action: PayloadAction<IOrderInfo>) => {
            state.order = action.payload;
        },
        clearOrder: (state: OrderState) => {
            state.order = undefined
        }
    }
})

export const {orderInfo, clearOrder} = orderSlice.actions;
export default orderSlice.reducer;