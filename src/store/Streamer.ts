import { getSnapshot, Instance, types } from "mobx-state-tree"
import getTime from "../utils/getTime";
import currencyColors from "../global/currencyColors.json";
import { ECurrency } from "../global/types";

const ECurrencyModel = types.enumeration(Object.keys(currencyColors))

const historyItem = types.model({
    time: types.string,
    cName: ECurrencyModel,
    cBase: ECurrencyModel,
    price: types.number,
})

const currency = types.model({
    name: ECurrencyModel,
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
        channel: "5~CCCAGG",
    }))
    .actions((self) => ({
        afterCreate() {
            self.ccStreamer.onopen = function onStreamOpen() {
                let subRequest = {
                    "action": "SubAdd",
                    "subs": [`${self.channel}~${self.subscribedCurrency.name}~${self.subscribedCurrencyBase.name}`],
                };
                self.ccStreamer.send(JSON.stringify(subRequest));
            }

            self.ccStreamer.onmessage = this.onStreamMessage

            self.ccStreamer.onerror = (e) => console.log(e)

        },
        onStreamMessage(message: {data: string}) {
            const data = JSON.parse(message.data)
            if (data.PRICE) {
                self.historyOfPriceChange.push({
                    cName: data.FROMSYMBOL,
                    cBase: data.TOSYMBOL,
                    time: getTime(),
                    price: data.PRICE,
                })

                if (
                    data.TOSYMBOL === self.subscribedCurrencyBase.name
                    &&
                    data.FROMSYMBOL === self.subscribedCurrency.name
                ) {
                    self.subscribedCurrency.price = data.PRICE

                    self.historyOfSubsPriceChange.push({
                        time: getTime(),
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
        streamByCurrencies(simpleCurrencyName: ECurrency, cryptoCurrencyName: ECurrency) {
            self.historyOfSubsPriceChange.clear()

            const gHistory = getSnapshot(self.historyOfPriceChange)
            const updatesForNewCurrency = gHistory.filter((heartBeat: typeof gHistory[0]) => (
                heartBeat.cBase === simpleCurrencyName && heartBeat.cName === cryptoCurrencyName)
            )

            if (updatesForNewCurrency.length) {
                self.historyOfSubsPriceChange.push(...updatesForNewCurrency)
            }

            self.subscribedCurrencyBase.name = simpleCurrencyName
            self.subscribedCurrency.name = cryptoCurrencyName

            let subRequest = {
                "action": "SubAdd",
                "subs": [`${self.channel}~${cryptoCurrencyName}~${simpleCurrencyName}`],
            };
            self.ccStreamer.send(JSON.stringify(subRequest));
        },
        streamBySimpleCurrency(simpleCurrencyName: ECurrency) {
            this.streamByCurrencies(simpleCurrencyName, self.subscribedCurrency.name as ECurrency)
        },
        streamByCryptoCurrency(cryptoCurrencyName: ECurrency) {
            this.streamByCurrencies(self.subscribedCurrencyBase.name as ECurrency, cryptoCurrencyName)
        },
    }))

export interface IStreamer extends Instance<typeof Streamer> {}
export default Streamer
