import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number;
    uniqID?: string;
    count?: number;
}

export interface IIngredientsData {
    success: boolean;
    data: IIngredient[];
}

export interface IMainDataRequest<T> {
    response: T | null,
    loading: boolean,
    hasError: boolean
}

export interface IOrderInfoRequest {
    ingredients: string[];
}

export interface IOrderInfoResponse {
    name: string,
    order: {
        number: number
    },
    success: boolean
}

export type IAuthRequest = IRegisterRequest & ILoginRequest & IForgotPasswordRequest & IResetPasswordRequest

// export type IFetchError = FetchBaseQueryError | SerializedError | undefined

export interface IFetchError {
    status: number;
    data: {
        success: boolean;
        message: string;
    }
}

export interface IUserInfo {
    email: string;
    name: string;
}

export interface IRegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface IRegisterResponse {
    success: boolean;
    user: IUserInfo;
    accessToken: string;
    refreshToken: string;
}

export type ILoginRequest = Omit<IRegisterRequest, "name">
export type ILoginResponse = IRegisterResponse

export type IForgotPasswordRequest = Omit<ILoginRequest, "password">
export interface IForgotPasswordResponse {
    success: boolean;
    message: string;
}

export interface IResetPasswordRequest {
    password: string;
    token: string;
}
export type IResetPasswordResponse = IForgotPasswordResponse

export interface IUpdateTokenRequest {
    token: string;
}

export type IUpdateTokenResponse = Omit<IRegisterResponse, "user">

export interface IUserInfoResponse {
    success: boolean;
    user?: IUserInfo;
    message?: string;
}

export type ILogoutResponse = Omit<IUserInfoResponse, "user">