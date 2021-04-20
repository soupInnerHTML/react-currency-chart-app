import { flow, getSnapshot, Instance, types } from "mobx-state-tree"
import getTime from "../utils/getTime";

const historyItem = types.model({
    time: types.string,
    cName: types.string,
    cBase: types.string,
    price: types.number,
})

const currency = types.model({
    name: types.string,
    price: types.optional(types.number, 0),
})

const Streamer = types
    .model("Streamer", {
        subscribedCurrency: types.optional(currency, { name: "BTC", }),
        subscribedCurrencyBase: types.optional(currency, { name: "USD", }),
        historyOfPriceChange: types.array(historyItem),
        historyOfSubsPriceChange: types.array(historyItem),
    })

    .volatile(self => ({
        ccStreamer: new WebSocket("wss://streamer.cryptocompare.com/v2?api_key=" + process.env.REACT_APP_CC_API_KEY),
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
                self.historyOfPriceChange.push({
                    cName: data.FROMSYMBOL,
                    cBase: data.TOSYMBOL,
                    time: getTime(data.LASTUPDATE),
                    price: data.PRICE,
                })

                if (
                    data.TOSYMBOL === self.subscribedCurrencyBase.name
                    &&
                    data.FROMSYMBOL === self.subscribedCurrency.name
                ) {
                    self.subscribedCurrency.price = data.PRICE

                    self.historyOfSubsPriceChange.push({
                        time: getTime(data.LASTUPDATE),
                        cName: data.FROMSYMBOL,
                        cBase: data.TOSYMBOL,
                        price: data.PRICE,
                    })
                }

                if (self.historyOfSubsPriceChange.length > 20) {
                    self.historyOfSubsPriceChange.splice(0, 15)
                }

                if (self.historyOfPriceChange.length > 20) {
                    self.historyOfPriceChange.splice(0, 15)
                }
            }
        },
        getHistory: flow(function* getHistory() {
            // const res = yield fetch("https://min-api.cryptocompare.com/data/exchange/histohour?tsym=BTC&limit=10&api_key=" + process.env.REACT_APP_CC_API_KEY)
            // const { Data, } = yield res.json()
            //
            // self.historyOfPriceChange.push(...Data.map((item: any) => ({ ...item, time: getTime(item.time), })))
        }),
        streamBySimpleCurrency: (simpleCurrencyName: string) => {
            self.historyOfSubsPriceChange.clear()

            const gHistory = getSnapshot(self.historyOfPriceChange)
            const updatesForNewCurrency: any = gHistory.filter((heartBeat: any) => (
                heartBeat.cBase === simpleCurrencyName && heartBeat.cName === self.subscribedCurrency.name)
            )

            if (updatesForNewCurrency.length) {
                self.historyOfSubsPriceChange.push(...updatesForNewCurrency)
            }

            self.subscribedCurrencyBase.name = simpleCurrencyName

            let subRequest = {
                "action": "SubAdd",
                "subs": ["2~Coinbase~BTC~" + simpleCurrencyName],
            };
            self.ccStreamer.send(JSON.stringify(subRequest));
        },
    }))

export interface IStreamer extends Instance<typeof Streamer> {}
export default Streamer

//TODO replace any types
