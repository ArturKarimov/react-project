import React from "react";
import "./app.module.scss";
import appStyle from "./app.module.scss";

import AppHeader from "./app-header/app-header";
import CreatingBurger from "./creating-burger/creating-burger";
import {IIngredientsData, IMainDataRequest} from "../common/interface";
import ErrorBoundary from "./error-boundary/error-boundary";
import Loading from "./loading/loading";
import {baseUrl} from "../utils/constants";

export const DataContext = React.createContext<IIngredientsData>({} as IIngredientsData);

function App() {
    const [state, setState] = React.useState<IMainDataRequest<IIngredientsData>>({
        response: null,
        loading: true,
        hasError: false
    })
    const isLoading = state.loading && !state.response?.success;

    const getIngredientsData = async () => {
        try {
            let data;
            setState({...state, loading: true});
            const res = await fetch(baseUrl);
            if (res.ok) {
                data = await res.json();
                setState({...state, response: data, loading: false});
            } else {
                return Promise.reject(`Ошибка ${res.status}`);
            }
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
