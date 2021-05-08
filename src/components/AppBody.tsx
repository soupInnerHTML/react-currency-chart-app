import React, { FC } from "react";
import ChartParams from "./Chart/Params/ChartParams";
import MainChart from "./Chart/MainChart";

const AppBody: FC = () => {
    return (
        <>
            <ChartParams/>
            <MainChart/>
        </>
    );
};

export default AppBody;
