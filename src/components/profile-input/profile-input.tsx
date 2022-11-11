import React from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export interface IProfileInput {
    placeholder: string;
    icon?: boolean;
}

const ProfileInput: React.FC<IProfileInput> = ({placeholder}) => {
    const [value, setValue] = React.useState("");

    return (
        <Input
            type={'text'}
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
            icon='EditIcon'
            value={value}
            name={'name'}
            error={false}
            onIconClick={() => {}}
            errorText={'Ошибка'}
            size={'default'}
        />
    );
};

export default ProfileInput;