import Streamer from "./Streamer";
import App from "./App";
import { Instance, types } from "mobx-state-tree";

const Store = types.model("Store", {
    streamer: types.optional(Streamer, {}),
    app: types.optional(App, {}),
})

export interface IStore extends Instance<typeof Store> {}

export default Store.create()
