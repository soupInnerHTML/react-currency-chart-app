import "../scss/App.scss";
import React, { FC } from "react";
import { IStore } from "../store";
import { withStore } from "../hoc/withStore";
import AppBody from "./AppBody";
import Loader from "./Loader";

const App:FC<IStore> = ({
    streamer: {
        historyOfSubsPriceChange,
    },
}) => {


    return (
        <div className="App">
            <div className="App-body">
                {
                    // historyOfSubsPriceChange.length ?
                    <AppBody/>
                    // : <Loader/>
                }
            </div>
        </div>
    );
}

export default withStore(App);

//TODO remove unused packages
