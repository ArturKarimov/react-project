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
import {ILocationState} from "../../common/interface";
import Feed from "../../pages/feed/feed";
import FeedDetails from "../modal/feed-details/feed-details";
import IngredientDetailsModal from "../../pages/modals/ingredient-details-modal";
import OrderDetailsModal from "../../pages/modals/order-details-modal";
import FeedDetailsModal from "../../pages/modals/feed-details-modal";

const AppRoutes = () => {
    let location = useLocation() as ILocationState;
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
                {!background &&
                    <ProtectedRouteGuest path="/profile/orders/:number">
                        <FeedDetails/>
                    </ProtectedRouteGuest>
                }
                <ProtectedRouteGuest path="/profile/orders">
                    <HistoryOrders/>
                </ProtectedRouteGuest>
                {!background &&
                    <Route path="/feed/:number">
                        <FeedDetails/>
                    </Route>
                }
                <Route path="/feed">
                    <Feed/>
                </Route>
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
                <Redirect to="/"/>
            </Switch>
            {background &&
                <Switch>
                    <Route exact path="/ingredients/:id">
                        <IngredientDetailsModal />
                    </Route>
                    <Route exact path="/order/:number">
                        <OrderDetailsModal />
                    </Route>
                    <Route path="/feed/:number">
                        <FeedDetailsModal />
                    </Route>
                    <Route exact path="/profile/orders/:number">
                        <FeedDetailsModal />
                    </Route>
                </Switch>
            }
        </div>
    );
};

export default AppRoutes;