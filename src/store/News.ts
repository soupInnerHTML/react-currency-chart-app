// https://min-api.cryptocompare.com/data/v2/news/?categories=RUB

import axios from "axios";
import { Instance, types, flow, getRoot, cast } from "mobx-state-tree";
import { IStore } from "./index";
import { reaction } from "mobx";

const NewsItem = types.model("NewsItem", {
    id: types.string,
    published: types.number,
    guid: types.string,
    imageurl: types.string,
    title: types.string,
    url: types.string,
    source: types.string,
    body: types.string,
    tags: types.string,
    categories: types.string,
    upvotes: types.string,
    downvotes: types.string,
    lang: types.string,
})

const News = types.model("News", {
    newsData: types.optional(types.array(NewsItem), []),
})
    .views(self => ({
        get root(): IStore {
            return getRoot<IStore>(self)
        },
        get subscribedCurrency(): string {
            return this.root.streamer.subscribedCurrency.name
        },
    }))
    .actions(self => ({
        fetchData: flow(function* () {
            self.newsData.clear();
            const { data: { Data, }, } = yield axios.get("https://min-api.cryptocompare.com/data/v2/news/?categories=" + self.subscribedCurrency);
            self.newsData = Data.map((_data: any) => ({
                ..._data,
                published: _data.published_on,
            }))
        }),
        afterCreate() {
            this.fetchData()

            reaction(() => self.subscribedCurrency, () => {
                this.fetchData()
            })
        },
    }))

export default News
export interface INews extends Instance<typeof News> {}
export interface INewsItem extends Instance<typeof NewsItem> {}
