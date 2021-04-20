import React, { FC } from "react";
import getColorByCurrency from "../../../utils/getColorByCurrency";

interface IProps {
    name: string,
    onClick?: () => void
}

const CurrencyNameWithDot:FC<IProps> = ({ name, ...props }) => {
    return (
        <div className={"currency"} {...props}>
            <div className="dot" style={{ background: getColorByCurrency(name), }}/>
            <p>{name}</p>
        </div>
    );
};

export default CurrencyNameWithDot;
