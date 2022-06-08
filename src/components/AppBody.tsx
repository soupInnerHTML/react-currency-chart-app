import React, { FC } from "react";
import ChartParams from "./Chart/Params/ChartParams";
import { MainLineChart, MainChartBar } from "./Chart/MainChart";
import BuyButton from "./BuyButton";
import { withStore } from "../hoc/withStore";
import { IStore } from "../store";
import News from "./News";

const AppBody: FC<IStore> = ({ streamer: { chartType, }, }) => {
    return (
        <>
            <ChartParams/>
            {/*@ts-ignore*/}
            {chartType === "line" ? <MainLineChart/> : <MainChartBar/>}
            <BuyButton></BuyButton>
            <News/>
        </>
    );
};

export default withStore(AppBody);
