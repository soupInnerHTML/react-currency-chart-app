import React from "react";
import ReactDOM from "react-dom";
import "./scss/index.scss";
import App from "../src/components/App";
import store from "./store";
import { Provider } from "mobx-react";

ReactDOM.render(
    <React.StrictMode>
        <Provider {...store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
