import { flow, getRoot, getSnapshot, Instance, types } from "mobx-state-tree"
import currencyColors from "../global/currencyColors.json";
import { PRICE, VOLUME } from "../global/consts";
import axios from "axios";
import getTime from "../utils/getTime";

const ECurrencyModel = types.enumeration(Object.keys(currencyColors))

const historyItem = types.model({
    time: types.string,
    cName: ECurrencyModel,
    cBase: ECurrencyModel,
    streamBy: types.number,
    streamBase: types.enumeration([PRICE, VOLUME]),
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
            this.getHistoryData()
        },
        getHistoryData: flow(function* () {
            const { data, } = yield self.api(`/histominute?fsym=${self.subscribedCurrency}&tsym=${self.subscribedCurrencyBase}&limit=10&`)
            const { Data, } = data.Data
            const history = Data.map((_historyItem: any) => ({
                time: getTime(new Date(_historyItem.time * 1000), true),
                cName: self.subscribedCurrency,
                cBase: self.subscribedCurrencyBase,
                streamBy: _historyItem.volumeto / 1000,
                streamBase: VOLUME,
            })).slice(0, -1)

            // @ts-ignore
            self.setGlobal(...history)
            // @ts-ignore
            self.setSubs(...history)

            console.log(Data)
        }),
        switchHistory: flow(function* (filterBy: (heartBeat: typeof gHistory[0]) => void) {
            self.streamer.subscribedCurrency.streamValue = 0

            const gHistory = getSnapshot(self.historyOfPriceChange)
            const updatesForNewCurrency = gHistory.filter(filterBy)

            if (updatesForNewCurrency.length) {
                // @ts-ignore
                self.historyOfSubsPriceChange = updatesForNewCurrency
                self.streamer.subscribedCurrency.streamValue = updatesForNewCurrency.slice(-1)[0].streamBy
            }
            else {
                self.historyOfSubsPriceChange.clear();
                (self as IHistory).getHistoryData()
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
        // cut() {
        //     self.historyOfPriceChange.splice(0, 15)
        // },
    }))

export interface IHistory extends Instance<typeof History> {}
export default History
