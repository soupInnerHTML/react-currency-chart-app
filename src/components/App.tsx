import "../css/App.css";
import React, { FC, useEffect, useState } from "react";
import logo from "../logo.svg";
import MainChart from "./MainChart";
import { storeType } from "../store";
import { observer } from "mobx-react";

const App:FC<storeType> = ({ streamer, app, }) => {
    const { subscribedCurrency, } = streamer
    const [prevPrice, setPrevPrice] = useState<number | undefined>()
    const [priceClass, setPriceClass] = useState<string>("")

    useEffect(() => {
        const base = "price-lighten-"
        if ((subscribedCurrency || 0) >= (prevPrice || 0)) {
            setPriceClass(base + "green")
        }
        else {
            setPriceClass(base + "red")
        }

        setPrevPrice(subscribedCurrency)

    }, [subscribedCurrency])


    return (
        <div className="App">
            <body className="App-body">
                {app.isReady ?
                    <img src={logo} className="App-logo" alt="logo" /> :
                    (<>
                        <p
                            onAnimationEnd={() => setPriceClass("")}
                            className={priceClass}
                        >
                            {subscribedCurrency}
                        </p>

                        <MainChart/>
                    </>)}
            </body>
        </div>
    );
}

export default observer(App);
