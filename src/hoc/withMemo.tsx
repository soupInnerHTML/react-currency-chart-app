import React, { FC } from "react";
// import { IStore } from "../store";

export default (Component: FC<any>) => (
    React.memo(
        Component,
        (prev, next) => (
            JSON.stringify(prev) !== JSON.stringify(next)
        )
    )
)
