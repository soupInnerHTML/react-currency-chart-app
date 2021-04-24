import React, { FC, useState } from "react";
import { ECurrency } from "../../../global/types";
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
    return (
        <div
            className={"currency"}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            {...props}
        >
            <div className="dot" style={{
                background: getColorByCurrency(name),
            }}/>
            <p>{name}</p>

            <CurrencySettings {...{ cb, data, isActive, }}/>
        </div>
    );
};

export default CurrencyNameWithDot;
