import React, { FC, useEffect } from "react";
import { getSnapshot } from "mobx-state-tree";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { withStore } from "../../hoc/withStore";
import { IStore } from "../../store";
import getColorByCurrency from "../../utils/getColorByCurrency";
import { ECurrency } from "../../global/types";
import Loader from "../Loader";

const MainChart:FC<IStore> = ({
    streamer: {
        subscribedCurrency,
        subscribedCurrencyBase,
        streamBy,
    },
    history: {
        historyOfSubsPriceChange,
        historyOfPriceChange,
    },
}) => {

    const tick = {
        fontSize: 11,
    }

    useEffect(() => {
        console.log(streamBy, "__streamBy__")
    }, [streamBy])

    useEffect(() => {
        console.log(getSnapshot(historyOfPriceChange), "__historyOfPriceChange__")
    }, [historyOfPriceChange.length])

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
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="time" { ...{ tick, }} />
                <YAxis domain={["dataMin", "dataMax"]} { ...{ tick, }} />
                <Tooltip />
                <Area
                    type="monotone"
                    name={streamBy}
                    dataKey={"streamValue"}
                    stroke={fromColor}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </>
    );
};

export default withStore(MainChart);