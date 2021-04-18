import Streamer from "./Streamer";
import App from "./App";

const streamer = Streamer.create()
const app = App.create()

const store = {
    streamer,
    app,
}

export type storeType = typeof store

export default store
