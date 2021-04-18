import { flow, getRoot, getSnapshot, Instance, types } from "mobx-state-tree"
import getTime from "../utils/getTime";

const historyItem = types.model({
    time: types.string,
    volume: types.number,
})

const Streamer = types
    .model("Streamer", {
        subscribedCurrency: types.union(types.number, types.undefined),
        historyOfPriceChange: types.array(historyItem),
    })
    .volatile(self => ({
        ccStreamer: new WebSocket("wss://streamer.cryptocompare.com/v2?api_key=" + process.env.REACT_APP_WS_API_KEY),
    }))
    .actions((self) => ({
        afterCreate() {
            this.getHistory()

            self.ccStreamer.onopen = function onStreamOpen() {
                let subRequest = {
                    "action": "SubAdd",
                    "subs": ["2~Coinbase~BTC~USD"],
                //    EUR,JPY
                };
                self.ccStreamer.send(JSON.stringify(subRequest));
            }

            self.ccStreamer.onmessage = this.onStreamMessage

        },
        onStreamMessage(message: any) {
            const data = JSON.parse(message.data)
            if (data.PRICE) {
                self.subscribedCurrency = data.PRICE
                self.historyOfPriceChange.push({
                    time: getTime(),
                    volume: data.PRICE,
                })

                if (self.historyOfPriceChange.length > 20) {
                    self.historyOfPriceChange.splice(0, 15)
                }
            }
        },
        getHistory: flow(function* getHistory() {
            // const res = yield fetch("https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10&api_key=" + process.env.REACT_APP_WS_API_KEY)
            // const { Data, } = yield res.json()
            //
            // self.historyOfPriceChange.push(...Data.map((item: any) => ({ ...item, time: getTime(item.time), })))
        }),
    }))

export interface IStreamer extends Instance<typeof Streamer> {}
export default Streamer
