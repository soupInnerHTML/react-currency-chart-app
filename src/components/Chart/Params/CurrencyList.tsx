import React, { FC, useMemo } from "react";
import CurrencyNameWithDot from "./CurrencyNameWithDot";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import cs from "classnames"
import { ECurrency } from "../../../global/types";
import chunk from "lodash/chunk.js"
import { getSnapshot } from "mobx-state-tree";

export interface ISettingsProps {
    data: ECurrency[],
    isActive?: boolean,
    cb: (name: ECurrency) => void
    id: number
}

const CurrencyList: FC<IStore & ISettingsProps> = ({
    data,
    cb,
    isActive,
    streamer: {
        subscribedCurrency,
        subscribedCurrencyBase,
    },
    chartParams: { setActiveCryptoSelect, activeCryptoSelect, },
    id,
}) => {
    const cName = subscribedCurrency.name
    const cBase = subscribedCurrencyBase.name

    const list: typeof data[] = useMemo(() => (
        data?.length ? (
            chunk(data.filter(c => c !== cName && c !== cBase), 3)
        ) : []
    ), [cName, cBase])

    function onClick(currencyName: ECurrency) {
        return () => {
            if (activeCryptoSelect !== id) {
                setActiveCryptoSelect(id)
            }
            else {
                cb(currencyName)
            }
        }
    }

    return (list.length ?
        <div className={cs("currency-list", { active: isActive, })} style={{ zIndex: activeCryptoSelect === id ? 10000 : 1000 - id, }}>
            <div className="currency-list-before"/>
            {
                list.map((sublist: ECurrency[]) => (
                    <div className={"currency-list-inner"}>
                        {sublist.map((currencyName: ECurrency, i) => (
                            <CurrencyNameWithDot
                                key={i}
                                name={currencyName}
                                onClick={onClick(currencyName)}
                            />
                        ))}
                    </div>
                ))
            }
        </div> : <></>
    )
}

export default withStore(CurrencyList);
