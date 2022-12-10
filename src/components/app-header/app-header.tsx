import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.scss';
import {NavLink, useHistory} from "react-router-dom";

const AppHeader = () => {
    const history = useHistory();

    const handleToHome = React.useCallback(() => {
        history.push({
            pathname: "/"
        })
    }, [history])

    return (
        <header>
            <div className={headerStyles.headerLeftBts}>
                <NavLink exact to="/" className={headerStyles.link} activeClassName={headerStyles.activeLink}>
                    <div className={headerStyles.constructorBtn}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default">Конструктор</p>
                    </div>
                </NavLink>
                <NavLink exact to="/feed" className={headerStyles.link} activeClassName={headerStyles.activeLink}>
                    <div className={headerStyles.constructorBtn}>
                        <ListIcon type="primary"/>
                        <p className="text text_type_main-default">Лента заказов</p>
                    </div>
                </NavLink>
            </div>
            <div className={headerStyles.headerLogo} onClick={handleToHome}>
                <Logo/>
            </div>
            <NavLink to="/profile" className={headerStyles.link} activeClassName={headerStyles.activeLink}>
                <div className={headerStyles.constructorBtn}>
                    <ProfileIcon type="primary"/>
                    <p className="text text_type_main-default">Личный кабинет</p>
                </div>
            </NavLink>
        </header>
    );
};

export default AppHeader;