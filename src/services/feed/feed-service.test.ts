import fetchMock from "jest-fetch-mock";
import {setupStore} from "../store/store";
import {BASE_URL} from "../../utils/constants";
import {feedApi} from "./feed-service";
import {TestHelpers} from "../../utils/tests";

describe("fetch feeds", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    test("request is correct", () => {
        const action = feedApi.endpoints.getOrderDetails.initiate("123");
        const endpoint = `${BASE_URL}/orders/123`;

        TestHelpers.RequestIsCorrect(action, "GET", endpoint);
    });

    it("successful response", () => {
        const store = setupStore();
        fetchMock.mockResponse(JSON.stringify({success: true}));

        return store
            .dispatch(feedApi.endpoints.getOrderDetails.initiate("123"))
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
            .dispatch(feedApi.endpoints.getOrderDetails.initiate("123"))
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