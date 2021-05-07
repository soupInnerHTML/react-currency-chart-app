import { flow, getRoot, getSnapshot, Instance, types } from "mobx-state-tree"
import currencyColors from "../global/currencyColors.json";
import { PRICE, VOLUME } from "../global/consts";
import axios from "axios";
import getTime from "../utils/getTime";
import normalizeNum from "../utils/normalizeNum";

const ECurrencyModel = types.enumeration(Object.keys(currencyColors))

const historyItem = types.model({
    time: types.string,
    cName: ECurrencyModel,
    cBase: ECurrencyModel,
    streamValue: types.number,
    streamBy: types.enumeration([PRICE, VOLUME]),
})

const History = types
    .model("History", {
        historyOfPriceChange: types.array(historyItem),
        historyOfSubsPriceChange: types.array(historyItem),
    })
    .volatile(self => ({
        api: axios.create({
            baseURL: "https://min-api.cryptocompare.com/data/v2",
            timeout: 5000,
            headers: {
                Authorization: "Apikey " + process.env.REACT_APP_CC_API_KEY,
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }),
    }))
    .views(self => ({
        get streamer() {
            // @ts-ignore
            return getRoot(self).streamer
        },
        get subscribedCurrency() {
            return this.streamer.subscribedCurrency.name
        },
        get subscribedCurrencyBase() {
            return this.streamer.subscribedCurrencyBase.name
        },
    }))
    .actions((self) => ({
        afterCreate() {
            if (self.streamer.streamBy === VOLUME) {
                this.getHistoryData()
            }
        },
        getHistoryData: flow(function* () {
            const { data, } = yield self.api(`/histominute?fsym=${self.subscribedCurrency}&tsym=${self.subscribedCurrencyBase}&limit=50`)
            const { Data, } = data.Data
            const history = Data.map((_historyItem: any) => ({
                time: getTime(new Date(_historyItem.time * 1000), true),
                cName: self.subscribedCurrency,
                cBase: self.subscribedCurrencyBase,
                streamValue: normalizeNum(_historyItem.volumeto / 1000),
                streamBy: VOLUME,
            })).slice(0, -1)

            // @ts-ignore
            self.setGlobal(...history)
            // @ts-ignore
            self.setSubs(...history)
        }),
        switchHistory: flow(function* (filterBy: (heartBeat: typeof gHistory[0]) => void) {
            self.streamer.subscribedCurrency.streamValue = 0

            const gHistory = getSnapshot(self.historyOfPriceChange)
            const updatesForNewCurrency = gHistory.filter(filterBy)

            if (updatesForNewCurrency.length) {
                // @ts-ignore
                self.historyOfSubsPriceChange = updatesForNewCurrency
                //last fixed value by this params
                self.streamer.subscribedCurrency.streamValue = updatesForNewCurrency.slice(-1)[0].streamValue
            }
            else {
                self.historyOfSubsPriceChange.clear();

                if (self.streamer.streamBy === VOLUME) {
                    (self as IHistory).getHistoryData()
                }
            }
        }),
        setGlobal(...data:Array<typeof historyItem>) {
            // @ts-ignore
            self.historyOfPriceChange.push(...data)
        },
        setSubs(...data:Array<typeof historyItem>) {
            // @ts-ignore
            self.historyOfSubsPriceChange.push(...data)
        },
    }))

export interface IHistory extends Instance<typeof History> {}
export default History
