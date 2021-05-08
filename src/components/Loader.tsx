import React, { FC } from "react";
import logo from "../logo.svg";

const Loader: FC = () => {
    return (
        <div className={"nullChart"}>
            <span>The data will appear here</span>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
};

export default Loader;
