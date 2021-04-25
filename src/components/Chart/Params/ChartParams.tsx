import React, { FC, useEffect, useState } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import cs from "classnames";
import { ECurrency } from "../../../global/types";

const ChartParams: FC<IStore> = ({
    streamer: {
        subscribedCurrency,
        subscribedCurrency: {
            price,
        },
        streamBySimpleCurrency,
        streamByCryptoCurrency,
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
        <div className="currency main">
            <p
                onAnimationEnd={() => setPriceClass("")}
                className={cs("price-lighten", priceClass)}
            >
                curr: {price}
            </p>

            <CurrencyNameWithDot
                name={subscribedCurrency.name as ECurrency}
                data={["BTC", "ETH", "XRP", "LTC"]}
                cb={streamByCryptoCurrency}
            />

            <CurrencyNameWithDot
                name={subscribedCurrencyBase.name as ECurrency}
                data={["USD", "EUR", "JPY", "USDT"]}
                cb={streamBySimpleCurrency}
            />
        </div>
    );
};

export default withStore(ChartParams);
