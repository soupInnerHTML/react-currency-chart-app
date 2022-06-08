import Streamer from "./Streamer";
import History from "./History";
import { Instance, types } from "mobx-state-tree";
import News from "./News";
import ChartParams from "./ChartParams";

const Store = types.model("Store", {
    streamer: types.optional(Streamer, {}),
    history: types.optional(History, {}),
    news: types.optional(News, {}),
    chartParams: types.optional(ChartParams, {}),
})

export interface IStore extends Instance<typeof Store> {}

export default Store.create()

