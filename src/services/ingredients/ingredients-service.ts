import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../utils/constants";
import {IIngredientsData, IOrderInfo, IOrderInfoRequest} from "../../common/interface";
import {Cookie} from "../../utils/cookie";

export const ingredientsApi = createApi({
    reducerPath: "ingredientsApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        fetchAllIngredients: build.query<IIngredientsData | undefined, "">({
            query: () => ({
                url: "/ingredients"
            })
        }),
        fetchOrderInfo: build.mutation<IOrderInfo, IOrderInfoRequest>({
            query: (items) => ({
                url: "/orders",
                method: "POST",
                body: items,
                headers: {
                    "Authorization": Cookie.getCookie("accessToken")
                }
            })
        })
    })
})