import {IIngredient, IOrdersDetails} from "../common/interface";
import {nanoid} from "@reduxjs/toolkit";

export class FormatOrderData {
    static getAmountItems = (array: IIngredient[]) => {
        return array?.reduce<{ [index: string]: number }>((acc, el) => {
            acc[el._id] = (acc[el._id] || 0) + 1;
            return acc;
        }, {})
    }

    static filterSameItems = (array: IIngredient[]) => {
        if (array && array.length) {
            return Object.values(array
                ?.reduce<{ [index: string]: any }>((acc, n) => (!acc[n._id!] && n._id && (acc[n._id] = n), acc), {})
            )
        }
    }

    static getTotalPriceItems = (array: IIngredient[]) => {
        return array?.reduce((acc, el) => acc + (el.price || 0), 0)
    }

    static getIngredientsById = (order: IOrdersDetails, ingredients: IIngredient[]) => {
        return order?.ingredients.map((id) => {
            const feeds = ingredients?.filter((el) => el._id === id)?.[0]
            return {
                ...feeds,
                uniqID: nanoid()
            }
        })
    }
}