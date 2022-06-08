import React, { FC, useState } from "react";
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
    const [activeSelectId, setActiveSelectId] = useState(-1)
    return (
        <div className="currency main">
            <CurrencyNameWithDot
                {...{ activeSelectId, setActiveSelectId, }}
                id={1}
                name={subscribedCurrency.name}
                data={["BTC", "ETH", "XRP", "LTC", "USDT", "BNB", "BUSD", "EOS", "ADA"]}
                cb={streamByCryptoCurrency}
            />

            <CurrencyNameWithDot
                {...{ activeSelectId, setActiveSelectId, }}
                id={2}
                name={subscribedCurrencyBase.name}
                data={["USD", "EUR", "JPY", "RUB"]}
                cb={streamBySimpleCurrency}
            />

            <StreamBaseSwitch/>

            <CurrentPrice/>

        </div>
    );
};

export default withStore(ChartParams)
