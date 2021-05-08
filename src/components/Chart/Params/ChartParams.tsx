import React, { FC } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import CurrentPrice from "./CurrentStreamValue";
import StreamBaseSwitch from "./StreamBaseSwitch";

const ChartParams: FC<IStore> = ({
    streamer: {
        subscribedCurrency,
        streamBySimpleCurrency,
        streamByCryptoCurrency,
        subscribedCurrencyBase,
    },
}) => {
    return (
        <div className="currency main">
            <CurrentPrice/>

            <StreamBaseSwitch/>

            <CurrencyNameWithDot
                name={subscribedCurrency.name}
                data={["BTC", "ETH", "XRP", "LTC"]}
                cb={streamByCryptoCurrency}
            />

            <CurrencyNameWithDot
                name={subscribedCurrencyBase.name}
                data={["USD", "EUR", "JPY", "USDT"]}
                cb={streamBySimpleCurrency}
            />
        </div>
    );
};

export default withStore(ChartParams)
