import React, { FC } from "react";

export default (Component: FC<any>) => (
    React.memo(
        Component,
        (prev, next) => (
            JSON.stringify(prev) === JSON.stringify(next)
        )
    )
)
