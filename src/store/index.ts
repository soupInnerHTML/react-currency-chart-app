import Streamer from "./Streamer";
import History from "./History";
import { Instance, types } from "mobx-state-tree";

const Store = types.model("Store", {
    streamer: types.optional(Streamer, {}),
    history: types.optional(History, {}),
})

export interface IStore extends Instance<typeof Store> {}

export default Store.create()
