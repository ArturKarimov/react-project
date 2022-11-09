import React from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setPrevPath} from "../../services/user/user-slice";

interface IProtectedRoute {
    children: React.ReactNode;
    path: any;
    exact: boolean;
}

export const ProtectedRouteUser: React.FC<IProtectedRoute> = ({children, path, exact}) => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    const history = useHistory()

    React.useEffect(() => {
        dispatch(setPrevPath(path))
    }, [history])

    return (
        <Route
            path={path}
            exact={exact}
            render={() => {
                return (
                    !isAuth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/'
                            }}
                        />
                    )
                )
            }
            }
        />
    );
}