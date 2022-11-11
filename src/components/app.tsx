import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./app.module.scss";
import appStyle from "./app.module.scss";

import AppHeader from "./app-header/app-header";
import ErrorBoundary from "./error-boundary/error-boundary";
import Loading from "./loading/loading";
import {ingredientsApi} from "../services/ingredients/ingredients-service";
import AppRoutes from "./app-routes/app-routes";
import {authApi} from "../services/auth/auth-service";
import {Cookie} from "../utils/cookie"
import {useUpdateToken} from "../hooks/useUpdateToken";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setIsAuth, setUserInfo} from "../services/user/user-slice";
import {setIngredients} from "../services/ingredients/ingredients-slice";

function App() {
    const {data, isLoading} = ingredientsApi.useFetchAllIngredientsQuery("");
    const [getUserInfo, {error, isError}] = authApi.endpoints.getUserInfo.useLazyQuery()
    const dispatch = useAppDispatch()

    const {isAuth} = useAppSelector(state => state.userReducer)

    const accessToken = Cookie.getCookie("accessToken");
    const refreshToken = Cookie.getCookie("refreshToken");

    const {data: tokenData} = useUpdateToken(isError, error)

    React.useEffect(() => {
        if (accessToken && refreshToken) {
            dispatch(setIsAuth(true))
        }
    }, [])

    React.useEffect(() => {
        if (isAuth) {
            getUserInfo(Cookie.getCookie("accessToken")).then((res) => {
                if (res?.data?.user) {
                    dispatch(setUserInfo(res.data.user))
                }
            })
        }
    }, [tokenData, isAuth])

    React.useEffect(() => {
        if (data) {
            dispatch(setIngredients(data?.data))
        }
    }, [data])

    return (
        <ErrorBoundary>
            <Router>
                <div className={appStyle.appWrapper}>
                    {isLoading ? <Loading/> :
                        <>
                            <AppHeader/>
                            <AppRoutes/>
                        </>
                    }
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
