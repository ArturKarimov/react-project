import React from 'react';
import styles from "./profile.module.scss";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import BaseInput from "../../components/base-input/base-input";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {authApi} from "../../services/auth/auth-service";
import {setIsEditUser} from "../../services/user/user-slice";

interface IProfileField {
    placeholder: string;
    name: string;
    type: "text" | "email" | "password";
}

export type IProfileFieldName = "name" | "email";

const profileFields: IProfileField[] = [
    {placeholder: "Имя", name: "name", type: "text"},
    {placeholder: "E-mail", name: "email", type: "email"}
]

const Profile = () => {
    const [updateUser, {data, isLoading}] = authApi.useUpdateUserInfoMutation()
    const {user, isEdit} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    const [value, setValue] = React.useState({
        name: user?.name || "",
        email: user?.email || ""
    })

    const [prevValue, setPrevValue] = React.useState({
        name: user?.name || "",
        email: user?.email || ""
    })

    React.useEffect(() => {
        if (prevValue.name || prevValue.email) {
            if (value.name !== prevValue.name || value.email !== prevValue.email) {
                dispatch(setIsEditUser(true))
            } else {
                dispatch(setIsEditUser(false))
            }
        }
    }, [value, prevValue])

    React.useEffect(() => {
        setValue({
            name: user?.name || "",
            email: user?.email || ""
        })
        setPrevValue({
            name: user?.name || "",
            email: user?.email || ""
        })
    }, [user]);

    React.useEffect(() => {
        if (data?.success) {
            dispatch(setIsEditUser(false))
        }
    }, [data?.success])

    const handleUpdateUser = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateUser(value)
    }

    const resetProfileEdit = () => {
        setValue(prevValue)
    }

    return (
        <section className={styles.wrapper}>
            <ProfileNavigation/>
            <form className={styles.formWrapper} onSubmit={handleUpdateUser}>
                <div className={styles.inputs}>
                    {profileFields.map((el) =>
                        <BaseInput
                            placeholder={el.placeholder}
                            icon={"EditIcon"}
                            name={el.name}
                            type={el.type}
                            key={el.name}
                            value={value}
                            setValue={setValue}
                        />)}
                    {isEdit &&
                        <div className={styles.buttons}>
                            <Button htmlType="button" type="secondary" onClick={resetProfileEdit}>Отменить</Button>
                            <Button htmlType="submit">{isLoading ? "Загрузка.." : "Сохранить"}</Button>
                        </div>
                    }
                </div>
            </form>
        </section>
    );
};

export default Profile;