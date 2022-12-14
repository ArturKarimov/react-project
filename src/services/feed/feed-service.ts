import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../utils/constants";
import {IOrdersDetailsResponse} from "../../common/interface";

export const feedApi = createApi({
    reducerPath: "feedApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        getOrderDetails: build.query<IOrdersDetailsResponse, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
    })
})