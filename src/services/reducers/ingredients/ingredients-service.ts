import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseUrlApi} from "../../../utils/constants";
import {IIngredientsData} from "../../../common/interface";

export const ingredientsApi = createApi({
    reducerPath: "ingredientsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrlApi}),
    endpoints: (build) => ({
        fetchAllIngredients: build.query<IIngredientsData | undefined, "">({
            query: () => ({
                url: "/ingredients"
            })
        })
    })
})