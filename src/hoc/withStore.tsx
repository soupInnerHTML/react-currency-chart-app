import React, { FC } from "react";
import store, { storeType } from "../store";
import { Observer } from "mobx-react-lite";

export const withStore = (Component: any) => () => (
    <Observer>
        {() => <Component {...store}/>}
    </Observer>
)
