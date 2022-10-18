import React from "react";
import "./app.module.scss";
import appStyle from "./app.module.scss";

import AppHeader from "./app-header/app-header";
import CreatingBurger from "./creating-burger/creating-burger";
import {IIngredientsData} from "../common/interface";
import ErrorBoundary from "./error-boundary/error-boundary";
import Loading from "./loading/loading";
import {useRequests} from "../hooks/useRequests";
import {Requests} from "../utils/requests/requests";
import {DataContext} from "../services/context";


function App() {
    const {response, loading} = useRequests<IIngredientsData>(Requests.getIngredients);
    const isLoading = loading && !response?.success;

    return (
        <ErrorBoundary>
            <DataContext.Provider value={response}>
                <div className={appStyle.appWrapper}>
                    {isLoading ? <Loading/> :
                        <>
                            <AppHeader/>
                            <CreatingBurger/>
                        </>
                    }
                </div>
            </DataContext.Provider>
        </ErrorBoundary>
    );
}

export default App;
