import React, { FC, useEffect, useState } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import cs from "classnames";

const ChartParams: FC<IStore> = ({
    streamer: {
        subscribedCurrency: {
            price,
            name,
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
        <div>
            <div style={{ width: window.innerWidth - 100, justifyContent: "flex-end", }} className="currency">
                <p
                    onAnimationEnd={() => setPriceClass("")}
                    className={cs("price-lighten", priceClass)}
                >
                    curr: {price}
                </p>

                <CurrencyNameWithDot
                    {...{ name, }}
                    data={["BTC", "ETH", "XRP", "LTC"]}
                    cb={streamByCryptoCurrency}
                />

                <CurrencyNameWithDot
                    name={subscribedCurrencyBase.name}
                    data={["USD", "EUR", "JPY", "USDT"]}
                    cb={streamBySimpleCurrency}
                />
            </div>
        </div>
    );
};

export default withStore(ChartParams);
