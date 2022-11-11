import React from 'react';
import styles from "./profile-navigation.module.scss";
import {NavLink, useHistory} from "react-router-dom";
import {authApi} from "../../services/auth/auth-service";
import {Cookie} from "../../utils/cookie";
import {setIsAuth, setUserInfo} from "../../services/user/user-slice";
import {useAppDispatch} from "../../hooks/redux";

const ProfileNavigation = () => {
    const [logout, {data}] = authApi.useLogoutMutation();
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        logout(Cookie.getCookie("refreshToken"))
    }

    React.useEffect(() => {
        if (data?.success) {
            Cookie.deleteCookie("accessToken")
            Cookie.deleteCookie("refreshToken")
            dispatch(setIsAuth(false));
            dispatch(setUserInfo(undefined));
            history.replace({pathname: '/login'});
        }
    }, [history, data?.success])

    return (
        <nav className={styles.wrapper}>
            <div className={styles.link}>
                <NavLink to={"/profile"} activeClassName={styles.activeLink} exact>
                    <p className="text text_type_main-medium text_color_inactive">
                        Профиль
                    </p>
                </NavLink>
            </div>
            <div className={styles.link}>
                <NavLink to={"/profile/orders"} activeClassName={styles.activeLink} exact>
                    <p className="text text_type_main-medium text_color_inactive">
                        История заказов
                    </p>
                </NavLink>
            </div>
            <div className={styles.link} onClick={handleLogout}>
                <p className="text text_type_main-medium text_color_inactive">
                    Выход
                </p>
            </div>
        </nav>
    );
};

export default ProfileNavigation;