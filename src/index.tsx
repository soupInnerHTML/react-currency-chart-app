import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "../src/components/App";
import store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <App {...store} />
    </React.StrictMode>,
    document.getElementById("root")
);
