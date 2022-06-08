import { getRoot, Instance, types } from "mobx-state-tree"
import { ECurrency } from "../global/types";
import { PRICE, VOLUME } from "../global/consts";
import { IHistory, IHistoryItem } from "./History";
import getTime from "../utils/getTime";
import currencyColors from "../global/currencyColors.json";
import normalizeNum from "../utils/normalizeNum";

export const ECurrencyModel = types.enumeration(Object.keys(currencyColors))

const currency = types.model({
    name: ECurrencyModel,
    streamValue: types.optional(types.number, 0),
})

const Streamer = types
    .model("Streamer", {
        streamBy: types.optional(types.string, PRICE),
        subscribedCurrency: types.optional(currency, { name: "BTC", }),
        subscribedCurrencyBase: types.optional(currency, { name: "USD", }),
        chartType: types.optional(types.enumeration(["line", "bar"]), "line"),
    })
    .volatile(self => ({
        ccStreamer: new WebSocket("wss://streamer.cryptocompare.com/v2?api_key=" + process.env.REACT_APP_CC_API_KEY),
        channel: "5~CCCAGG",
    }))
    .views(self => ({
        get history() {
            return (getRoot(self) as any).history as IHistory
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
            const _streamBy = normalizeNum(data[self.streamBy.toUpperCase()])
            if (_streamBy) {
                const selectedItem = {
                    time: getTime(),
                    cName: data.FROMSYMBOL,
                    cBase: data.TOSYMBOL,
                    streamValue: _streamBy,
                    streamBy: self.streamBy as any,
                }

                self.history.setGlobal(selectedItem)

                if (
                    data.TOSYMBOL === self.subscribedCurrencyBase.name &&
                    data.FROMSYMBOL === self.subscribedCurrency.name
                ) {
                    self.subscribedCurrency.streamValue = _streamBy
                    self.history.setSubs(selectedItem)
                }
            }
        },
        streamByCurrencies(simpleCurrencyName: ECurrency, cryptoCurrencyName: ECurrency) {
            self.subscribedCurrencyBase.name = simpleCurrencyName
            self.subscribedCurrency.name = cryptoCurrencyName

            self.history.switchHistory((heartBeat: IHistoryItem) => (
                heartBeat.cBase === simpleCurrencyName &&
                heartBeat.cName === cryptoCurrencyName &&
                heartBeat.streamBy === self.streamBy
            ))

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
            self.streamBy = _streamBy
            self.history.switchHistory((heartBeat: IHistoryItem) => (
                heartBeat.streamBy === _streamBy && heartBeat.streamValue
            ))
        },
        updateSubscribedCurrencyByLast(arr: Array<IHistoryItem>) {
            self.subscribedCurrency.streamValue = arr.slice(-1)[0].streamValue
        },
        setChartType(charType: "line" | "bar") {
            self.chartType = charType;
        },
    }))

export interface IStreamer extends Instance<typeof Streamer> {}
export default Streamer
