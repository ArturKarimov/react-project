import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setPrevPath} from "../../services/user/user-slice";

interface IProtectedRoute {
    children: React.ReactNode;
    path: any;
    exact: boolean;
}

export const ProtectedRouteGuest: React.FC<IProtectedRoute> = ({children, path, exact}) => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setPrevPath(path))
    }, [])

    return (
        <Route
            path={path}
            exact={exact}
            render={() => {
                return (
                    isAuth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login'
                            }}
                        />
                    )
                )
            }
            }
        />
    );
}