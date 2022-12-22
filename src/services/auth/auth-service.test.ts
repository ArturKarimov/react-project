import fetchMock from "jest-fetch-mock";
import {BASE_URL} from "../../utils/constants";
import {authApi} from "./auth-service";
import {TestHelpers} from "../../utils/tests";

describe("register", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = {
        name: "name",
        email: "email@email.ru",
        password: "password"
    }
    const mockResponse = {
        user: { email: "user@mail.ru", name: "user" },
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        success: true
    }
    const action = authApi.endpoints.register.initiate(payload);

    it("register request is correct", () => {
        const endpoint = `${BASE_URL}/auth/register`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("login", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = {
        email: "email@email.ru",
        password: "password"
    }
    const mockResponse = {
        user: { email: "user@mail.ru", name: "user" },
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        success: true
    }
    const action = authApi.endpoints.login.initiate(payload);

    it("login request is correct", () => {
        const endpoint = `${BASE_URL}/auth/login`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("forgot password", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = {
        email: "email@email.ru"
    }
    const mockResponse = {
        message: "done",
        success: true
    }
    const action = authApi.endpoints.forgotPassword.initiate(payload);

    it("forgot password request is correct", () => {
        const endpoint = `${BASE_URL}/password-reset`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("reset password", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = {
        password: "password",
        token: "test-token"
    }
    const mockResponse = {
        message: "done",
        success: true
    }
    const action = authApi.endpoints.resetPassword.initiate(payload);

    it("reset password request is correct", () => {
        const endpoint = `${BASE_URL}/password-reset/reset`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("update token", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = { token: "refreshToken" }

    const mockResponse = {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        success: true
    }
    const action = authApi.endpoints.updateToken.initiate(payload.token);

    it("update token request is correct", () => {
        const endpoint = `${BASE_URL}/auth/token`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("logout", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = { token: "refreshToken" }
    const mockResponse = {
        message: "done",
        success: true
    }
    const action = authApi.endpoints.logout.initiate(payload.token);

    it("logout request is correct", () => {
        const endpoint = `${BASE_URL}/auth/logout`;

        TestHelpers.RequestIsCorrect(action, "POST", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("get user info", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = { token: "accessToken" }
    const mockResponse = {
        user: {email: "user@mail.ru", name: "user"},
        message: "done",
        success: true
    }
    const action = authApi.endpoints.getUserInfo.initiate(payload.token);

    it("getUserInfo request is correct", () => {
        const endpoint = `${BASE_URL}/auth/user`;

        TestHelpers.RequestIsCorrect(action, "GET", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});

describe("update user info", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    });

    const payload = { email: "user@mail.ru", name: "user" }
    const mockResponse = {
        user: { email: "user@mail.ru", name: "user" },
        message: "done",
        success: true
    }
    const action = authApi.endpoints.updateUserInfo.initiate(payload);

    it("updateUserInfo request is correct", () => {
        const endpoint = `${BASE_URL}/auth/user`;

        TestHelpers.RequestIsCorrect(action, "PATCH", endpoint, mockResponse, payload)
    });

    it("successful response", () => {
        TestHelpers.RequestIsSuccess(action, mockResponse);
    });

    it("unsuccessful response", () => {
        TestHelpers.RequestIsFailed(action)
    })
});