import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import {setupStore} from "./services/store/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
reportWebVitals();
