import React, { FC } from "react";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";

const CurrencySettings: FC<IStore> = ({
    streamer: { streamBySimpleCurrency, },
}) => {
    return (
        <div className={"currency-settings"}>
            <CurrencyNameWithDot name={"USD"} onClick={() => streamBySimpleCurrency("USD")}/>
            <CurrencyNameWithDot name={"EUR"} onClick={() => streamBySimpleCurrency("EUR")}/>
            <CurrencyNameWithDot name={"JPY"} onClick={() => streamBySimpleCurrency("JPY")}/>
        </div>
    );
};

export default withStore(CurrencySettings);
