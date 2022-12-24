import orderReducer, {clearOrder, orderInfo} from "./order-slice";

describe("orderSlice", () => {
    const mockOrder = {
        name: "TestOrder",
        order: {
            number: 5
        },
        success: true
    }

    it('should return default state when passed an empty action', function () {
        const result = orderReducer(undefined, { type: "" })

        expect(result).toEqual({ order: undefined });
    });

    it('should get order with "orderInfo" action', function () {
        const action = {type: orderInfo.type, payload: mockOrder}
        const result = orderReducer({ order: undefined }, action)

        expect(result.order?.name).toBe("TestOrder");
        expect(result.order?.order.number).toBe(5);
        expect(result.order?.success).toBe(true);
    });

    it('should clear order with "clearOrder" action', function () {
        const action = {type: clearOrder.type}
        const result = orderReducer({ order: mockOrder }, action)

        expect(result).toEqual({ order: undefined });
    });
})