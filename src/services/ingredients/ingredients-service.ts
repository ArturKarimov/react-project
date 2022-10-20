import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseUrl} from "../../utils/constants";
import {IIngredientsData, IOrderInfoRequest, IOrderInfoResponse} from "../../common/interface";

export const ingredientsApi = createApi({
    reducerPath: "ingredientsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (build) => ({
        fetchAllIngredients: build.query<IIngredientsData | undefined, "">({
            query: () => ({
                url: "/ingredients"
            })
        }),
        fetchOrderInfo: build.mutation<IOrderInfoResponse, IOrderInfoRequest>({
            query: (items) => ({
                url: "/orders",
                method: "POST",
                body: items
            })
        })
    })
})