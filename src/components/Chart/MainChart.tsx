import React, { FC } from "react";
import { getSnapshot } from "mobx-state-tree";
import { Area, AreaChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { withStore } from "../../hoc/withStore";
import { IStore } from "../../store";
import getColorByCurrency from "../../utils/getColorByCurrency";
import { ECurrency } from "../../global/types";
import getTime from "../../utils/getTime";
import Loader from "../Loader";

const MainChart:FC<IStore> = ({
    streamer: {
        subscribedCurrency,
        subscribedCurrencyBase,
        streamBy,
    },
    history: {
        historyOfSubsPriceChange,
    },
}) => {

    const tick = {
        fontSize: 11,
    }

    const fromColor = getColorByCurrency(subscribedCurrency.name as ECurrency)
    const toColor = getColorByCurrency(subscribedCurrencyBase.name as ECurrency)

    const data = getSnapshot(historyOfSubsPriceChange)
    const isDataNull = data.length < 2

    return (
        <>
            {isDataNull && <Loader/>}
            <AreaChart
                width={window.innerWidth - 100}
                height={400}
                data={isDataNull ? [] : data}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={fromColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={toColor} stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" { ...{ tick, }} />
                <YAxis domain={["dataMin", "dataMax"]} { ...{ tick, }} />
                <Tooltip />
                <Area
                    type="monotone"
                    name={streamBy}
                    dataKey={"streamBy"}
                    stroke={fromColor}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
                {/*<ReferenceLine x={getTime()} />*/}
            </AreaChart>
        </>
    );
};

export default withStore(MainChart);
