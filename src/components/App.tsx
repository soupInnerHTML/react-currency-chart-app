import "../scss/App.scss";
import React, { FC } from "react";
import AppBody from "./AppBody";

const App:FC = () => {
    return (
        <div className="App">
            <div className="App-body">
                <AppBody/>
            </div>
        </div>
    );
}

export default App;
