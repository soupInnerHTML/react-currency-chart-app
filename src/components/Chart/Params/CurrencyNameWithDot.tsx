import React, { FC, useMemo, useState } from "react";
import { ECurrency } from "../../../global/types";
import withMemo from "../../../hoc/withMemo";
import getColorByCurrency from "../../../utils/getColorByCurrency";
import CurrencySettings, { ISettingsProps } from "./CurrencyList";

interface IProps {
    name: ECurrency,
    onClick?: () => void,
    data: ECurrency[]
}

const CurrencyNameWithDot:FC<IProps & ISettingsProps> =
({
    name,
    cb,
    data,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false)
    const CColor = useMemo(() => getColorByCurrency(name), [name])

    return (
        <div
            className={"currency"}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            {...props}
        >
            <div className="dot" style={{
                background: CColor,
                boxShadow: "0 0 7px " + CColor,
            }}/>
            <p>{name}</p>

            <CurrencySettings {...{ cb, data, isActive, }}/>
        </div>
    );
};

export default withMemo(CurrencyNameWithDot);
