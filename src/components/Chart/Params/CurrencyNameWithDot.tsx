import React, { FC, useCallback, useMemo, useState } from "react";
import { ECurrency } from "../../../global/types";
import { withStore } from "../../../hoc/withStore";
import getColorByCurrency from "../../../utils/getColorByCurrency";
import CurrencySettings, { ISettingsProps } from "./CurrencyList";
import { IStore } from "../../../store";
import cs from "classnames"

interface IProps {
    name: ECurrency,
    onClick?: () => void,
    data: ECurrency[];
    id: number;
    activeSelectId?: number;
    setActiveSelectId?: React.Dispatch<React.SetStateAction<number>>
}

const CurrencyNameWithDot:FC<ISettingsProps & IProps & IStore> =
({
    name,
    cb,
    data,
    id,
    chartParams: { setActiveCryptoSelect, activeCryptoSelect, },
    ...props
}) => {
    const CColor = useMemo(() => getColorByCurrency(name), [name])
    const [touched, touch] = useState(false);

    const setActive = useCallback(() => {
        if (setActiveCryptoSelect && activeCryptoSelect === -1) {
            setActiveCryptoSelect(id)
        }
    }, [setActiveCryptoSelect])

    const setInactive = useCallback(() => {
        setActiveCryptoSelect && setActiveCryptoSelect(-1)
    }, [setActiveCryptoSelect])

    return (
        <div
            className={"currency"}
            onClick={() => {
                touch(true);
                setActive()
            }}
            {...props}
        >
            <div className={cs("dot", { untouched: !touched && id, })} style={{
                background: CColor,
                boxShadow: "0 0 7px " + CColor,
            }}/>
            <p>{name}</p>

            <CurrencySettings {...{ cb, data, setActive, setInactive, id, }} isActive={activeCryptoSelect === id} />
        </div>
    );
};

export default withStore(CurrencyNameWithDot);
