import React from 'react';
import AuthWrapper from "../components/auth-wrapper/auth-wrapper";
import {authApi} from "../services/auth/auth-service";
import {Cookie} from "../utils/cookie";
import {Redirect, useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setIsAuth} from "../services/user/user-slice";

const Login = () => {
    const [login, {isLoading, error, data}] = authApi.useLoginMutation()
    const history = useHistory();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (data?.success) {
            Cookie.setCookie("accessToken", data.accessToken)
            Cookie.setCookie("refreshToken", data.refreshToken)
            dispatch(setIsAuth(true));
        }
    }, [data?.success, history])

    return (
        <AuthWrapper
            title="Вход"
            inputs={[
                {placeholder: "E-mail", name: "email", type: "email"},
                {placeholder: "Пароль", icon: "ShowIcon", name: "password", type: "password"}
            ]}
            button={{ title: "Вход", callback: login, isLoading: isLoading, error: error  }}
            actions={[
                { title: "Вы - новый пользователь?", link: "Зарегистрироваться", path: "/register" },
                { title: "Забыли пароль?", link: "Восстановить пароль", path: "/forgot-password" }
            ]}
        />
    );
};

export default Login;