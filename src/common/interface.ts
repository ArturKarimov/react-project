import React from "react";

export interface IIngredients {
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
}

export interface IIngredientsData {
    success: boolean;
    data: IIngredients[];
}

export interface IMainDataRequest<T> {
    response: T | null,
    loading: boolean,
    hasError: boolean
}

export interface IOrderInfoRequest {
    name: string,
    order: {
        number: number
    },
    success: boolean
}