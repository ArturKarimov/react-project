import React from "react";
import {IMainDataRequest} from "../common/interface";

export function useRequests<T>(request: () => Promise<Response>): IMainDataRequest<T> {
    const [state, setState] = React.useState<IMainDataRequest<T>>({
        response: null,
        loading: true,
        hasError: false
    })

    const requests = React.useCallback(async (): Promise<Response | unknown> => {
        try {
            let data;
            setState({...state, loading: true});
            const res = await request()
            if (res.ok) {
                data = await res.json();
                await setState({...state, response: data, loading: false});
            } else {
                return Promise.reject(`Ошибка ${res.status}`);
            }
        } catch (e) {
            console.log("Error", e);
            setState({...state, hasError: true, loading: false});
        }
    }, [])

    React.useEffect(() => {
        requests()
    }, [])

    return {response: state.response, loading: state.loading, hasError: state.hasError}
}