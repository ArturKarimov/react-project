import React from 'react';
import {useHistory} from "react-router-dom";

import AuthWrapper from "../components/auth-wrapper/auth-wrapper";
import {authApi} from "../services/auth/auth-service";
import {Cookie} from "../utils/cookie";
import {useAppDispatch} from "../hooks/redux";
import {setIsAuth} from "../services/user/user-slice";

const Registration = () => {
    const [register, {isLoading, error, data}] = authApi.useRegisterMutation()
    const history = useHistory();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (data?.success) {
            Cookie.setCookie("accessToken", data.accessToken)
            Cookie.setCookie("refreshToken", data.refreshToken)
            dispatch(setIsAuth(true))
            history.replace({pathname: '/'})
        }
    }, [history, data?.success])

    return (
        <AuthWrapper
            title="Регистрация"
            inputs={[
                {placeholder: "Имя", name: "name", type: "text"},
                {placeholder: "E-mail", name: "email", type: "email"},
                {placeholder: "Пароль", icon: "ShowIcon", name: "password", type: "password"}
            ]}
            button={{title: "Зарегистрироваться", callback: register, isLoading: isLoading, error: error}}
            actions={[
                {title: "Уже зарегистрированы?", link: "Войти", path: "/login"}
            ]}
        />
    );
};

export default Registration;