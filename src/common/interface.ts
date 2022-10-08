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

export interface IMainDataRequest {
    response: IIngredientsData | null,
    loading: boolean,
    hasError: boolean
}