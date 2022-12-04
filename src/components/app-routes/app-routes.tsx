import React from 'react';
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import CreatingBurger from "../creating-burger/creating-burger";
import Profile from "../../pages/profile/profile";
import Login from "../../pages/login";
import Registration from "../../pages/registration";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import {ProtectedRouteGuest} from "../protected-route/protected-route-guest";
import HistoryOrders from "../../pages/historyOrders/history-orders";
import {ProtectedRouteUser} from "../protected-route/protected-route-user";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import {Modal} from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import {ILocationState} from "../../common/interface";

const AppRoutes = () => {
    const location = useLocation() as ILocationState;
    const background = location.state && location.state.background;

    return (
        <div>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <CreatingBurger/>
                </Route>
                {!background &&
                    <Route path="/ingredients/:id">
                        <IngredientDetails/>
                    </Route>
                }
                <ProtectedRouteGuest exact={true} path="/profile">
                    <Profile/>
                </ProtectedRouteGuest>
                <ProtectedRouteGuest exact={true} path="/profile/orders">
                    <HistoryOrders/>
                </ProtectedRouteGuest>
                <ProtectedRouteUser exact path="/login">
                    <Login/>
                </ProtectedRouteUser>
                <ProtectedRouteUser exact path="/register">
                    <Registration/>
                </ProtectedRouteUser>
                <ProtectedRouteUser exact path="/forgot-password">
                    <ForgotPassword/>
                </ProtectedRouteUser>
                <ProtectedRouteUser exact path="/reset-password">
                    <ResetPassword/>
                </ProtectedRouteUser>
                <Redirect to="/" />
            </Switch>
            {
                background &&
                <Switch>
                    <Route exact path="/ingredients/:id">
                        <Modal title="Детали ингредиента" width={720}>
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                    <Route exact path="/order/:number">
                        <Modal width={720} height={718}>
                            <OrderDetails />
                        </Modal>
                    </Route>
                </Switch>
            }
        </div>
    );
};

export default AppRoutes;