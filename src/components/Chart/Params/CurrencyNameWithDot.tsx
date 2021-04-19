import React, { FC } from "react";
import getColorByCurrency from "../../../utils/getColorByCurrency";

interface IProps {
    name: string
}

const CurrencyNameWithDot:FC<IProps> = ({ name, }) => {
    return (
        <>
            <div className="dot" style={{ background: getColorByCurrency(name), }}/>
            <p>{name}</p>
        </>
    );
};

export default CurrencyNameWithDot;
