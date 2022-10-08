import React from "react";
import "./app.module.scss";
import appStyle from "./app.module.scss";

import AppHeader from "./app-header/app-header";
import CreatingBurger from "./creating-burger/creating-burger";
import { IIngredientsData, IMainDataRequest } from "../common/interface";
import ErrorBoundary from "./error-boundary/error-boundary";
import Loading from "./loading/loading";

export const DataContext = React.createContext<IIngredientsData>({} as IIngredientsData);

function App() {
    const [state, setState] = React.useState<IMainDataRequest>({
        response: null,
        loading: true,
        hasError: false
    })
    const isLoading = state.loading && !state.response?.success;

    const getIngredientsData = async () => {
        const url = process.env.REACT_APP_DATA_API_URL || "";
        try {
            setState({...state, loading: true});
            const res = await fetch(url);
            const data = await res.json();
            setState({...state, response: data, loading: false });
        } catch (e) {
            console.log("Error", e);
            setState({...state, hasError: true, loading: false});
        }
    }

    React.useEffect(() => {
        getIngredientsData()
    }, [])

    return (
        <ErrorBoundary>
                <DataContext.Provider value={state.response || {} as IIngredientsData}>
                    <div className={appStyle.appWrapper}>
                        {isLoading ? <Loading /> :
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
