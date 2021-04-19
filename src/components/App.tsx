import "../css/App.scss";
import React, { FC } from "react";
import logo from "../logo.svg";
import MainChart from "./Chart/MainChart";
import { IStore } from "../store";
import { withStore } from "../hoc/withStore";
import ChartParams from "./Chart/Params/ChartParams";

const App:FC<IStore> = ({ app, }) => {


    return (
        <div className="App">
            <body className="App-body">
                {app.isReady ?
                    <img src={logo} className="App-logo" alt="logo" /> :
                    (<>
                        <ChartParams/>
                        <MainChart/>
                    </>)}
            </body>
        </div>
    );
}

export default withStore(App);
