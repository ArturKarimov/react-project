import React from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';

type IBaseInputValue<T> = {
    [key in keyof T]: T[key]
}

export interface IBaseInput<T> {
    placeholder: string;
    icon?: "ShowIcon" | "EditIcon" | undefined;
    name: string;
    type: "text" | "email" | "password";
    value: IBaseInputValue<T>;
    setValue: (value: IBaseInputValue<T>) => void;
}

const BaseInput = <T, >(
    {
        placeholder,
        icon,
        name,
        type,
        value,
        setValue
    }: IBaseInput<T>) => {

    const [edit, setEdit] = React.useState(true)
    const [isEditType, setEditType] = React.useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        setValue({
            ...value,
            [name]: targetValue
        })
    }

    const handleIconClick = () => {
        switch (icon) {
            case "EditIcon":
                setEdit(!edit)
                break
            case "ShowIcon":
                setEditType(!isEditType)
                break
        }
    }

    const checkDisabledInput = () => {
        return icon === "EditIcon" && edit
    }

    return (
        <Input
            type={isEditType ? "text" : type}
            placeholder={placeholder}
            onChange={handleInputChange}
            icon={icon}
            value={value[name as keyof IBaseInputValue<T>] as string}
            name={name}
            error={false}
            errorText={'Ошибка'}
            disabled={checkDisabledInput()}
            onIconClick={handleIconClick}
            size={'default'}
        />
    );
};

export default BaseInput;