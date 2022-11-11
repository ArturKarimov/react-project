import React from 'react';
import {useHistory} from "react-router-dom";

import AuthWrapper from "../components/auth-wrapper/auth-wrapper";
import {authApi} from "../services/auth/auth-service";
import {setPrevPath} from "../services/user/user-slice";
import {useAppDispatch} from "../hooks/redux";

const ForgotPassword = () => {
    const [forgot, {isLoading, error, data}] = authApi.useForgotPasswordMutation()

    const history = useHistory();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (data?.success) {
            dispatch(setPrevPath("/forgot-password"))
            history.replace({ pathname: '/reset-password' });
        }
    }, [history, data?.success])

    return (
        <AuthWrapper
            title="Восстановление пароля"
            inputs={[
                {placeholder: "Укажите e-mail", name: "email", type: "email"}
            ]}
            button={{ title: "Восстановить", callback: forgot, isLoading: isLoading, error: error }}
            actions={[
                { title: "Вспомнили пароль?", link: "Войти", path: "/login" }
            ]}
        />
    );
};

export default ForgotPassword;