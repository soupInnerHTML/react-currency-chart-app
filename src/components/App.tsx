import "../scss/App.scss";
import React, { FC } from "react";
import logo from "../logo.svg";
import MainChart from "./Chart/MainChart";
import { IStore } from "../store";
import { withStore } from "../hoc/withStore";
import ChartParams from "./Chart/Params/ChartParams";

const App:FC<IStore> = ({ streamer: { subscribedCurrency, }, }) => {


    return (
        <div className="App">
            <div className="App-body">
                {
                    !subscribedCurrency.price ?
                        <img src={logo} className="App-logo" alt="logo" /> :
                        (<>
                            <ChartParams/>
                            <MainChart/>
                        </>)
                }
            </div>
        </div>
    );
}

export default withStore(App);

//TODO remove unused packages
