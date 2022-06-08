import React from "react";
import { withStore } from "../../hoc/withStore";
import { INewsItem } from "../../store/News";
import { IStore } from "../../store";
import getColorByCurrency from "../../utils/getColorByCurrency";
import { ECurrency } from "../../global/types";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const NewsItem: React.FC<INewsItem & IStore> = ({ title, imageurl, body, url, categories, published, streamer: { subscribedCurrency, }, }) => {
    return (
        <a href={url} target="_blank" className={"news-item"}>
            <img className={"news-item__image"} src={imageurl}/>
            <div>
                <p className={"news-item__title"}>{title} <span className={"news-item__date"}>{dayjs(published * 1000).fromNow()}</span></p>
                <p className={"news-item__body"}>{body}</p>
                <p className={"news-item__body"}>Categories: {categories.split("|").map(category => (
                    <span className={"news-item__tag"} style={subscribedCurrency.name === category ? { color: getColorByCurrency(subscribedCurrency.name as ECurrency), borderColor: getColorByCurrency(subscribedCurrency.name as ECurrency), } : {}}>{category}</span>
                ))}</p>
            </div>
        </a>
    );
};

export default withStore(NewsItem);
