import fetchMock from "jest-fetch-mock";
import {setupStore} from "../services/store/store";

export class TestHelpers {
    static RequestIsCorrect = (
        action: any,
        methodRequest: "GET" | "POST" | "PATCH",
        endpoint: string,
        mockResponse?: unknown,
        payload?: unknown
    ) => {
        const store = setupStore();
        fetchMock.mockResponse(JSON.stringify(mockResponse));

        return store
            .dispatch(action)
            .then(() => {
                expect(fetchMock).toBeCalledTimes(1);
                const request = fetchMock.mock.calls[0][0] as Request;
                const { method, url } = request;

                if (payload) {
                    void request.json().then((data) => {
                        expect(data).toStrictEqual(payload);
                    }).catch(err => console.log(err))
                }

                expect(method).toBe(methodRequest);
                expect(url).toBe(endpoint);
            });
    }

    static RequestIsSuccess = (action: any, mockResponse: unknown) => {
        const store = setupStore();
        fetchMock.mockResponse(JSON.stringify(mockResponse));

        return store
            .dispatch(action)
            .then((action: any) => expect(action.data).toStrictEqual(mockResponse));
    }

    static RequestIsFailed = (action: any) => {
        const store = setupStore();
        fetchMock.mockReject(new Error("Internal Server Error"));

        return store
            .dispatch(action)
            .then((action: any) => expect(action?.error.error).toBe("Error: Internal Server Error"));
    }
}