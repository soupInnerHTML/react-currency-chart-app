import { getRoot, getSnapshot, types } from "mobx-state-tree"
import getTime from "../utils/getTime";
import currencyColors from "../global/currencyColors.json";
import { ECurrency } from "../global/types";
import { PRICE, VOLUME } from "../global/consts";

const ECurrencyModel = types.enumeration(Object.keys(currencyColors))

const currency = types.model({
    name: ECurrencyModel,
    streamValue: types.optional(types.number, 0),
})

const Streamer = types
    .model("Streamer", {
        streamBy: types.optional(types.string, VOLUME),
        subscribedCurrency: types.optional(currency, { name: "BTC", }),
        subscribedCurrencyBase: types.optional(currency, { name: "USD", }),
    })
    .volatile(self => ({
        ccStreamer: new WebSocket("wss://streamer.cryptocompare.com/v2?api_key=" + process.env.REACT_APP_CC_API_KEY),
        channel: "5~CCCAGG",
    }))
    .views(self => ({
        get history() {
            // @ts-ignore
            return getRoot(self).history
        },
        get historyOfPriceChange() {
            return this.history.historyOfPriceChange
        },
        get historyOfSubsPriceChange() {
            return this.history.historyOfSubsPriceChange
        },
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
            const _streamBy = Number(data[self.streamBy.toUpperCase()]?.toFixed(3))
            if (_streamBy) {
                self.history.setGlobal({
                    time: getTime(),
                    cName: data.FROMSYMBOL,
                    cBase: data.TOSYMBOL,
                    streamBy: _streamBy,
                    streamBase: self.streamBy as any,
                })

                if (
                    data.TOSYMBOL === self.subscribedCurrencyBase.name
                    &&
                    data.FROMSYMBOL === self.subscribedCurrency.name
                ) {
                    self.subscribedCurrency.streamValue = _streamBy

                    self.history.setSubs({
                        time: getTime(),
                        cName: data.FROMSYMBOL,
                        cBase: data.TOSYMBOL,
                        streamBy: _streamBy,
                        streamBase: self.streamBy as any,
                    })
                }

                // if (self.historyOfSubsPriceChange.length > 20) {
                //     // self.historyOfSubsPriceChange.splice(0, 15)
                //     self.history.cut()
                // }
                //
                // if (self.historyOfPriceChange.length > 20) {
                //     // self.historyOfPriceChange.splice(0, 15)
                //     self.history.cut()
                // }
            }
        },
        streamByCurrencies(simpleCurrencyName: ECurrency, cryptoCurrencyName: ECurrency) {
            self.history.switchHistory((heartBeat: any) => (
                heartBeat.cBase === simpleCurrencyName && heartBeat.cName === cryptoCurrencyName
            ))

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
        setStreamBy(_streamBy: typeof PRICE | typeof VOLUME) {
            self.history.switchHistory((heartBeat: any) => (
                heartBeat.streamBase === _streamBy && heartBeat.streamBy
            ))
            self.streamBy = _streamBy
        },
    }))

export default Streamer
