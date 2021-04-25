import React, { FC } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import { ECurrency } from "../../../global/types";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import compose from "../../../utils/compose";
import withMemo from "../../../hoc/withMemo";
import CurrentPrice from "./CurrentPrice";

const ChartParams: FC<IStore> = ({
    streamer: {
        subscribedCurrency,
        streamBySimpleCurrency,
        streamByCryptoCurrency,
        subscribedCurrencyBase,
    },
}) => {


    console.log("render ChartParams")

    return (
        <div className="currency main">
            <CurrentPrice/>

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

export default withStore(ChartParams)

// export default compose(withStore, withMemo)(ChartParams)
