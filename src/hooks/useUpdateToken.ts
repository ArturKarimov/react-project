import React from "react";

import {isFetchBaseQueryErrorType} from "../utils/error";
import {authApi} from "../services/auth/auth-service";
import {Cookie} from "../utils/cookie";

export const useUpdateToken = (isError: boolean, error: unknown) => {
    const [updateToken, {data}] = authApi.useUpdateTokenMutation()

    const accessToken = Cookie.getCookie("accessToken");
    const refreshToken = Cookie.getCookie("refreshToken");

    React.useEffect(() => {
        if (isError && error) {
            if (isFetchBaseQueryErrorType(error)) {
                if ((error.data.message === "jwt expired" || !accessToken) && refreshToken) {
                    updateToken(refreshToken)
                }
            }
        }
    }, [isError])

    React.useEffect(() => {
        if (data) {
            Cookie.setCookie("accessToken", data.accessToken)
            Cookie.setCookie("refreshToken", data.refreshToken)
        }
    }, [data])

    return {data}
}