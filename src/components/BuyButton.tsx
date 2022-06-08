import React from "react";
import { withStore } from "../hoc/withStore";
import { IStore } from "../store";

const BuyButton: React.FC<IStore> = ({ streamer: { subscribedCurrency, subscribedCurrencyBase, }, }) => {
    const link = `https://www.binance.com/en/buy-sell-crypto?fiat=${subscribedCurrencyBase.name}&crypto=${subscribedCurrency.name}`;
    return (
        <div className={"buy-buttons"}>
            <a target="_blank" className={"buy-button"} href={link}>BUY</a>
            <a target="_blank" className={"buy-button"} href={link + "&type=SELL"}>SELL</a>
        </div>
    );
};

export default withStore(BuyButton);
