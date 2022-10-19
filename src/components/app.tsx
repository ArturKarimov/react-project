import React from "react";
import "./app.module.scss";
import appStyle from "./app.module.scss";

import AppHeader from "./app-header/app-header";
import CreatingBurger from "./creating-burger/creating-burger";
import ErrorBoundary from "./error-boundary/error-boundary";
import Loading from "./loading/loading";
import {ingredientsApi} from "../services/reducers/ingredients/ingredients-service";

function App() {
    const { isLoading } = ingredientsApi.useFetchAllIngredientsQuery("");

    return (
        <ErrorBoundary>
                <div className={appStyle.appWrapper}>
                    {isLoading ? <Loading/> :
                        <>
                            <AppHeader/>
                            <CreatingBurger/>
                        </>
                    }
                </div>
        </ErrorBoundary>
    );
}

export default App;
