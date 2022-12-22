import fetchMock from "jest-fetch-mock";
import {setupStore} from "../store/store";
import {ingredientsApi} from "./ingredients-service";
import {BASE_URL} from "../../utils/constants";
import {TestHelpers} from "../../utils/tests";


describe("fetch ingredients", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    test("request is correct", () => {
        const action = ingredientsApi.endpoints.fetchAllIngredients.initiate("");
        const endpoint = `${BASE_URL}/ingredients`;

        TestHelpers.RequestIsCorrect(action, "GET", endpoint);
    });

    it("successful response", () => {
        const store = setupStore();
        fetchMock.mockResponse(JSON.stringify({success: true}));

        return store
            .dispatch(ingredientsApi.endpoints.fetchAllIngredients.initiate(""))
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual({success: true});
            });
    });

    it("unsuccessful response", () => {
        const store = setupStore();
        fetchMock.mockReject(new Error("Internal Server Error"));

        return store
            .dispatch(ingredientsApi.endpoints.fetchAllIngredients.initiate(""))
            .then((action: any) => {
                const {
                    status,
                    error: { error },
                    isError,
                } = action;
                expect(status).toBe("rejected");
                expect(isError).toBe(true);
                expect(error).toBe("Error: Internal Server Error");
            });
    })
});

describe("fetch order info", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = {
        ingredients: ["123", "456"]
    }
    const mockResponse = {name: "Test", order: { number: 111 }, success: true};
    const action = ingredientsApi.endpoints.fetchOrderInfo.initiate(payload);

    it("request is correct", () => {
        const endpoint = `${BASE_URL}/orders`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse)
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
})