import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.scss';

const AppHeader = () => {
    return (
        <header>
            <div className={headerStyles.headerLeftBts}>
                <div className={headerStyles.constructorBtn}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default">Конструктор</p>
                </div>
                <div className={headerStyles.constructorBtn}>
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default">Лента заказов</p>
                </div>
            </div>
            <div className={headerStyles.headerLogo}>
                <Logo />
            </div>
            <div className={headerStyles.constructorBtn}>
                <ProfileIcon type="primary" />
                <p className="text text_type_main-default">Личный кабинет</p>
            </div>
        </header>
    );
};

export default AppHeader;