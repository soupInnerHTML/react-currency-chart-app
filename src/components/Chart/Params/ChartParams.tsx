import React, { FC, useEffect, useState } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import CurrencySettings from "./CurrencySettings";

const ChartParams: FC<IStore> = ({
    streamer: {
        subscribedCurrency: {
            price,
            name,
        },
        subscribedCurrencyBase,
    },
}) => {
    const [prevPrice, setPrevPrice] = useState<number>(0)
    const [priceClass, setPriceClass] = useState<string>("")

    useEffect(() => {
        if (price >= prevPrice) {
            setPriceClass("green")
        }
        else {
            setPriceClass("red")
        }

        setPrevPrice(price)

    }, [price])

    return (
        <div>
            <div style={{ width: window.innerWidth - 100, }} className="currency">
                <CurrencySettings/>

                <p
                    onAnimationEnd={() => setPriceClass("")}
                    className={"price-lighten " + priceClass}
                >
                    curr: {price}
                </p>

                <CurrencyNameWithDot {...{ name, }}/>
                <CurrencyNameWithDot name={subscribedCurrencyBase.name}/>
            </div>
        </div>
    );
};

export default withStore(ChartParams);
