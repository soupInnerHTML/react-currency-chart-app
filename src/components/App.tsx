import "../scss/App.scss";
import React, { FC } from "react";
import AppBody from "./AppBody";
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import News from "./News";
import { withStore } from "../hoc/withStore";
import { IStore } from "../store";

const App:FC<IStore> = ({ chartParams: { setActiveCryptoSelect, activeCryptoSelect, }, }) => {
    return (
        <div className="App">
            <div className="App-body" onClick={() => activeCryptoSelect !== -1 && setActiveCryptoSelect(-1)}>
                <AppBody/>
                {/*<BrowserRouter>*/}
                {/*<Link to={"/"} title={"chart"} />*/}
                {/*<Link to={"/news"} title={"news"} />*/}
                {/*<Routes>*/}
                {/*    <Route path="/" element={<AppBody/>} />*/}
                {/*    <Route path="/news" element={<News/>} />*/}
                {/*</Routes>*/}
                {/*</BrowserRouter>*/}
            </div>
        </div>
    );
}

export default withStore(App);
