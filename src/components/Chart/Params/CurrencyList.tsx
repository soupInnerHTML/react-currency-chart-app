import React, { FC, useMemo } from "react";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import cs from "classnames"
import { ECurrency } from "../../../global/types";
import withMemo from "../../../hoc/withMemo";
import compose from "../../../utils/compose";

export interface ISettingsProps {
    data: ECurrency[],
    isActive?: boolean,
    cb: (name: ECurrency) => void
}

const CurrencyList: FC<IStore & ISettingsProps> = ({
    data,
    cb,
    isActive,
    streamer: {
        subscribedCurrency,
        subscribedCurrencyBase,
    },
}) => {
    const cName = subscribedCurrency.name
    const cBase = subscribedCurrencyBase.name

    const list: typeof data = useMemo(() => (
        data?.length ? (
            data.filter(c => c !== cName && c !== cBase)
        ) : []
    ), [cName, cBase])

    return (list.length ?
        <div className={cs("currency-list", { active: isActive, })}>
            <div className="currency-list-before"/>
            {
                list.map((currencyName: ECurrency, i) => (
                    // @ts-ignore
                    <CurrencyNameWithDot
                        key={i}
                        name={currencyName}
                        onClick={() => cb(currencyName)}
                    />
                ))
            }
        </div> : <></>
    )
}

export default withStore(CurrencyList);

// export default compose(withStore, withMemo)(CurrencyList)