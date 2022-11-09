import React from 'react';
import AuthWrapper from "../components/auth-wrapper/auth-wrapper";
import {authApi} from "../services/auth/auth-service";
import {Redirect, useHistory} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {FORGOT_PATH} from "../utils/constants";

const ResetPassword = () => {
    const [reset, {data, isLoading, error}] = authApi.useResetPasswordMutation()
    const {prevPath} = useAppSelector(state => state.userReducer)

    const history = useHistory();

    React.useEffect(() => {
        if (data?.success) {
            history.replace({pathname: '/login'});
        }
    }, [history, data?.success])


    if (prevPath !== FORGOT_PATH) {
        return (
            <Redirect
                to={FORGOT_PATH}
            />
        );
    }

    return (
        <AuthWrapper
            title="Восстановление пароля"
            inputs={[
                {placeholder: "Введите новый пароль", icon: "ShowIcon", name: "password", type: "password"},
                {placeholder: "Введите код из письма", name: "token", type: "text"}
            ]}
            button={{ title: "Сохранить", callback: reset, isLoading: isLoading, error: error }}
            actions={[
                { title: "Вспомнили пароль?", link: "Войти", path: "/login" }
            ]}
        />
    );
};

export default ResetPassword;