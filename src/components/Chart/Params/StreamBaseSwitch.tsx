import React, { FC } from "react";
import { withStore } from "../../../hoc/withStore";
import { IStore } from "../../../store";
import cs from "classnames";
import { PRICE, VOLUME } from "../../../global/consts";

const StreamBaseSwitch: FC<IStore> = ({
    streamer: {
        // streamBy,
        // setStreamBy,
        chartType,
        setChartType,
    },
}) => {
    function volActive() {
        // setStreamBy(VOLUME)
        setChartType("line")
    }
    function priceActive() {
        // setStreamBy(PRICE)
        setChartType("bar")
    }

    return (
        <div className={"switch"}>
            <div onClick={volActive} className={cs({ active: chartType === "line", })}>
                Line
            </div>
            <div onClick={priceActive} className={cs({ active: chartType === "bar", })}>
                Bar
            </div>
        </div>
    );
};

export default withStore(StreamBaseSwitch);
