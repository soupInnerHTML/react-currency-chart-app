import React, { FC } from "react";
import { inject, observer } from "mobx-react";
import store from "../store";

//get all names of models on top level of store
const stores = Object.keys({ ...store, })

export const withStore = (Component: FC<any>) => (
    inject(...stores)(observer(Component))
)
