import React from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import { useAppSelector} from "../../hooks/redux";

export const ProtectedRouteUser: React.FC<RouteProps & {children?: React.ReactNode}> = ({children, path, exact}) => {
    const {isAuth} = useAppSelector(state => state.userReducer)

    return (
        <Route
            path={path}
            exact={exact}
            render={({location}: any) => {
                return (
                    !isAuth ? (
                        children
                    ) : (
                        <Redirect
                            to={location?.state?.from || '/'}
                        />
                    )
                )
            }
            }
        />
    );
}