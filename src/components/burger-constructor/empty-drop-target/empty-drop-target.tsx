import React from 'react';
import empty from "./empty-drop-target.module.scss";

const EmptyDropTarget = () => {
    return (
    <p className={`text text_type_digits-default ${empty.text}`}>
        Начни собирать бургер. Просто перетащи нужные ингредиенты.
        И не забудь выбрать булку :)
    </p>
    );
};

export default EmptyDropTarget;