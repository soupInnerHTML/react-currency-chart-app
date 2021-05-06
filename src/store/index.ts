import Streamer from "./Streamer";
import App from "./App";
import { Instance, types } from "mobx-state-tree";
import History from "./History";

const Store = types.model("Store", {
    streamer: types.optional(Streamer, {}),
    app: types.optional(App, {}),
    history: types.optional(History, {}),
})

export interface IStore extends Instance<typeof Store> {}

export default Store.create()
