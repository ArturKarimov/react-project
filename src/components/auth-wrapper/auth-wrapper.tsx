import React from 'react';
import styles from "./auth-wrapper.module.scss";

import BaseInput from "../base-input/base-input";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from 'react-router-dom';
import {IAuthRequest} from "../../common/interface";
import {formatErrorMessage} from "../../utils/formatErrorMessage";
import {useForm} from "../../hooks/useForm";

interface IAuthWrapperProps {
    title: string;
    inputs: IInput[];
    button: {
        title: string,
        callback?: (data: IAuthRequest) => void;
        isLoading?: boolean;
        error: any;
    };
    actions: IAuthActions[];
}

interface IInput {
    placeholder: string;
    name: string;
    type: "text" | "email" | "password";
    icon?: "ShowIcon" | "EditIcon" | undefined;
}

interface IAuthActions {
    title: string;
    link: string;
    path?: string;
}

const AuthWrapper: React.FC<IAuthWrapperProps> = ({title, inputs, button, actions}) => {
    const {values, setValues} = useForm({
        name: "",
        email: "",
        password: "",
        token: ""
    });

    const takeRequireFields = (): IAuthRequest | unknown => {
        return Object.fromEntries(Object.entries(values).filter(([_, val]) => val !== ""));
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        button?.callback?.(takeRequireFields() as IAuthRequest)
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <p className="text text_type_main-medium">
                    {title}
                </p>
                {inputs.map((input, index) => <BaseInput
                    value={values}
                    setValue={setValues}
                    key={index}
                    placeholder={input.placeholder}
                    icon={input.icon}
                    name={input.name}
                    type={input.type}
                />)}
                {button.error && <p className={`text text_type_main-default ${styles.error}`}>
                    {formatErrorMessage(button.error?.data?.message || button.error?.status)}
                </p>}
                <Button type="primary" size="medium" htmlType="submit">
                    {button.isLoading ? "Загрузка.." : button.title}
                </Button>
            </form>
            <section className={styles.actionsWrap}>
                {actions.map((action) => {
                    return (
                        <div className={styles.actions} key={action.title}>
                            <p className="text text_type_main-default text_color_inactive">
                                {action.title}
                            </p>
                            <Link to={action.path || "/"}>
                                <p className={`text text_type_main-default ${styles.link}`}>
                                    {action.link}
                                </p>
                            </Link>
                        </div>
                    )
                })}
            </section>
        </div>
    );
};

export default AuthWrapper;