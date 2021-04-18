import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <App {...store} />
    </React.StrictMode>,
    document.getElementById("root")
);
