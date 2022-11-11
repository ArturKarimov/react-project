import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BASE_URL} from "../../utils/constants";
import {
    IForgotPasswordRequest,
    IForgotPasswordResponse,
    ILoginRequest,
    ILoginResponse, ILogoutResponse,
    IRegisterRequest,
    IRegisterResponse,
    IResetPasswordRequest,
    IResetPasswordResponse,
    IUpdateTokenResponse, IUserInfo,
    IUserInfoResponse
} from "../../common/interface";
import {Cookie} from "../../utils/cookie";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        register: build.mutation<IRegisterResponse, IRegisterRequest>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data
            })
        }),
        login: build.mutation<ILoginResponse, ILoginRequest>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),
        forgotPassword: build.mutation<IForgotPasswordResponse, IForgotPasswordRequest>({
            query: (data) => ({
                url: "/password-reset",
                method: "POST",
                body: data
            })
        }),
        resetPassword: build.mutation<IResetPasswordResponse, IResetPasswordRequest>({
            query: (data) => ({
                url: "/password-reset/reset",
                method: "POST",
                body: data
            })
        }),
        updateToken: build.mutation<IUpdateTokenResponse, string>({
            query: (data) => ({
                url: "/auth/token",
                method: "POST",
                body: {token: data}
            })
        }),
        logout: build.mutation<ILogoutResponse, string | undefined>({
            query: (data) => ({
                url: "/auth/logout",
                method: "POST",
                body: {token: data}
            })
        }),
        getUserInfo: build.query<IUserInfoResponse | undefined, any>({
            query: (token) => ({
                url: "/auth/user",
                headers: {
                    "Authorization": token
                }
            })
        }),
        updateUserInfo: build.mutation<IUserInfoResponse, IUserInfo>({
            query: (data) => ({
                url: "/auth/user",
                method: "PATCH",
                body: data,
                headers: {
                    "Authorization": Cookie.getCookie("accessToken")
                }
            })
        })
    })
})