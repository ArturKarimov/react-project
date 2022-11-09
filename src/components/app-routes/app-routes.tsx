import React from 'react';
import {Route, Switch} from "react-router-dom";
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

const AppRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <CreatingBurger/>
            </Route>
            <Route path="/ingredients/:id" exact>
                <IngredientDetails/>
            </Route>
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
        </Switch>
    );
};

export default AppRoutes;