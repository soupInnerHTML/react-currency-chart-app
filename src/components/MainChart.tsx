import React, { FC } from "react";
import { getSnapshot } from "mobx-state-tree";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import store from "../store";
import { observer } from "mobx-react-lite";

const { streamer, } = store

const MainChart:FC<object> = () => {
    const tick = {
        fontSize: 11,
    }

    return (
        <AreaChart
            width={window.innerWidth - 100}
            height={400}
            data={getSnapshot(streamer.historyOfPriceChange)}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff7300" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" { ...{ tick, }} />
            <YAxis dataKey="volume" domain={["dataMin", "dataMax"]} { ...{ tick, }} />
            <Tooltip />
            <Area type="monotone" dataKey="volume" stroke="#ff7300" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    );
};

export default observer(MainChart);
