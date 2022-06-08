import React, { FC } from "react";
import { getSnapshot } from "mobx-state-tree";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Tooltip, XAxis, YAxis } from "recharts";
import { withStore } from "../../hoc/withStore";
import { IStore } from "../../store";
import getColorByCurrency from "../../utils/getColorByCurrency";
import { ECurrency } from "../../global/types";
import Loader from "../Loader";

export const MainLineChart:FC<IStore> = withStore(({
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

    const data = getSnapshot(historyOfSubsPriceChange) as any
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
                <YAxis orientation={"right"} allowDataOverflow domain={["dataMin", "dataMax"]} { ...{ tick, }} />
                <Tooltip />

                <Area
                    type="monotone"
                    name={streamBy}
                    dataKey={"streamValue"}
                    stroke={fromColor}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    // scale={2}
                />
            </AreaChart>
        </>
    );
});

export const MainChartBar:FC<IStore> = withStore(({
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

    const data = getSnapshot(historyOfSubsPriceChange) as any[]
    const isDataNull = data.length < 2

    const dataMin: number = Math.min(...data.map(entry => entry.streamValue))
    const dataMax: number = Math.max(...data.map(entry => entry.streamValue))


    return (
        <>
            {isDataNull && <Loader/>}
            <BarChart
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
                <YAxis orientation={"right"} allowDataOverflow domain={["dataMin", "dataMax"]} { ...{ tick, }} />
                <Tooltip />

                {/*<Area*/}
                {/*    type="monotone"*/}
                {/*    name={streamBy}*/}
                {/*    dataKey={"streamValue"}*/}
                {/*    stroke={fromColor}*/}
                {/*    fillOpacity={1}*/}
                {/*    fill="url(#colorUv)"*/}
                {/*    // scale={2}*/}
                {/*/>*/}

                <Bar type="monotone" name={streamBy} dataKey="streamValue">
                    {data.map((entry, index) => (
                        <Cell fill={data[index - 1]?.streamValue > entry.streamValue ? "red" : "green"} />
                    ))}
                </Bar>
            </BarChart>
        </>
    );
});
