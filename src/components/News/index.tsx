import React from "react";
import { withStore } from "../../hoc/withStore";
import { IStore } from "../../store";
import NewsItem from "./NewsItem";

const News: React.FC<IStore> = ({ news: { newsData, }, }) => {
    return (
        <div className={"news"}>
            {newsData.map(newsItem => (
                <NewsItem {...newsItem}></NewsItem>
            ))}
        </div>
    );
};

export default withStore(News);
