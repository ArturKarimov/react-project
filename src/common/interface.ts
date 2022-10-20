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

