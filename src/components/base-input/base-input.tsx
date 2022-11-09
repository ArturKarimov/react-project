import React, {useRef} from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';

export interface IBaseInput {
    placeholder: string;
    icon?: "ShowIcon" | "EditIcon" | undefined;
    name: string;
    type: "text" | "email" | "password";
    value: any;
    setValue: (value: any) => void;
}

const BaseInput: React.FC<IBaseInput> = (
    {
        placeholder,
        icon,
        name,
        type,
        value,
        setValue
    }) => {

    const [edit, setEdit] = React.useState(true)
    const [isEditType, setEditType] = React.useState(false)
    const inputRef = useRef<any>(null);

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
            value={value[name]}
            name={name}
            error={false}
            errorText={'Ошибка'}
            disabled={checkDisabledInput()}
            onIconClick={handleIconClick}
            size={'default'}
            ref={inputRef}
        />
    );
};

export default BaseInput;